// import React, { useState } from 'react'
// import {logout} from "../../services/operations/authApi"
// import { useDispatch, useSelector } from 'react-redux'
// import Loading from '../common/Loading'
// import sidebarLinks from '../../data/dashboard-links'
// import SidebarLink from './SidebarLink'
// import { useNavigate } from 'react-router-dom'
// import ConfirmationModal from '../common/ConfirmationModal'
// import { VscSignOut } from "react-icons/vsc";

// const Slidebar = () => {
//     const {user , loading : profileLoading} = useSelector((state) => state.profile);
//     const {loading:authLoading} = useSelector((state) => state.auth);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [confirmationModal , setConfirmationModa] = useState(null)


//     if(profileLoading || authLoading){
//         return (
//             <Loading/>
//         )
//     }
//     return(
//         <div className='text-white'>
//             <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
//                 <div className='flex flex-col'>
//                     {
//                         sidebarLinks.map((link , i) =>{
//                             if(link.type && user?.accountType !== link.type) return null;
//                             return (
//                                 <SidebarLink key={link.id} link={link} iconName={link.icon } />
//                             )
//                         })
//                     }
//                 </div>
//                 <div className='mx-auto mt-6 mb-6 h-[2px] w-10/12 bg-richblack-900'></div>

//                 <div>
//                     <SidebarLink 
//                     link={{name:"Setting", path:"/dashboard/setting"}}
//                     iconName="VscSettingsGear"
//                     />

//                     <button
//                     onClick={()=>setConfirmationModa(
//                         {
//                             text1:"Are You Sure ? ",
//                             text2:"You will be logged Out",
//                             btn1Text:"Logout",
//                             btn2Text:"Cancel",
//                             btn1Handler:() => dispatch(logout(navigate)),
//                             btn2Handler:() => setConfirmationModa(null)
//                         }
//                     )}
//                     className=''
//                     >
//                         <div className='flex items-center gap-2'>
//                             <VscSignOut />
//                             <span>Logout</span>
//                         </div>
//                     </button>
//                 </div>
//             </div>
//             {
//                 ConfirmationModal && <ConfirmationModal
//                 modalData = {confirmationModal} 
//                 />

//             }
//         </div>
//     )
// }

// export default Slidebar

import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import  sidebarLinks  from "../../data/dashboard-links"
import { logout } from "../../services/operations/authApi"
import ConfirmationModal from "../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="grid text-white h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className="text-richblack-100 flex h-[calc(100vh-3.5rem)] md:min-w-[220px] w-[120px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300 bg-richblue-400"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}