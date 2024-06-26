const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageCloudinary } = require("../utils/imageUploader");

// Update Profile i.e. profile bydefault create with null value
exports.updateProfile = async (req,res) => {
    try {
        // Get Data
        const {dateOfBirth="", about = "",contactNumber ,gender=""} = req.body;
        // Get User Id
        const id = req.user.id;
        // Validation 
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"Incomplete Data Update Profile",
            })
        }

        // find Profile
        const userDetails = await User.findById(id);

        const prodileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(prodileId);

        // Update Profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();
        // return response
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfull" ,
            profileDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Update Profile",
            error:message.error
        })
    }
}

// Delete profile Handler
exports.deleteAccount = async(req,res) =>{
    try {
        // get Id
        const id = req.user.id;

        // validation 
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User Not Found",
            })
        }

        // delete Profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        // delete user 
        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"Profile Deleted Successfull",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Delete Profile",
            error:message.error
        })
    }
}

// Get User Details
exports.getAllUserDetails = async(req,res) =>{
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message:"Profile Details Fetched Successfull",
            userDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Get User Details",
            error:message.error
        })
    }
}

// Update DisplayPicture
exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log("image ",image);
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { images: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}


exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }
  
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}
  