import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../services/operations/profileApi';
import Loading from '../common/Loading';
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {
    const {token} = useSelector((state) => state.auth);

    const [enrolledCourses , setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async() =>{
        try {   
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
            console.log("response in Enrolled Course ",response)
            
        } catch (error) {
            console.log("Unable to fetch Enrolled Courses = ",error)
        }
    }
    useEffect(()=>{
        getEnrolledCourses();
    },[])
  return (
    <div className=' text-richblack-25'>
      <div>Enrolled Courses</div>
      {
        !enrolledCourses ? (<div>
            <Loading/>
        </div>)
        : !enrolledCourses.length ? (<p>You have not enrolled in any courses</p>)
        : (
            <div>
                <div>
                    <p>Courses Name </p>
                    <p>Duration</p>
                    <p>Progress</p>
                </div>
                {/* Cards for courses */}
                {
                    enrolledCourses.map((course,index) =>{
                        return (
                            <div>
                                <div>
                                    <img src={course.thumbnail} alt='course-thumbnail'/>
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>

                                    <div>
                                        {course?.totalDuration}
                                    </div>
                                    <div>
                                        <p>Progress : {course.progressPercentage || 0}</p>
                                        <ProgressBar
                                            completed={course.progressPercentage || 0}
                                            height='8px'
                                            isLabelVisible={false}

                                        />
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
        
      }
    </div>
  )
}

export default EnrolledCourses
