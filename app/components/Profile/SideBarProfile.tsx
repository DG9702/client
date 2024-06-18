import React, {FC} from 'react';
import Image from 'next/image';
import Link from "next/link";
import {RiLockPasswordLine} from "react-icons/ri";
import {SiCoursera} from "react-icons/si"
import { AiOutlineLogout } from "react-icons/ai";
import {MdOutlineAdminPanelSettings} from "react-icons/md"
import avatarDefault from "../../../public/assets/avatar.png";

type Props = {
    user:any;
    active:number;
    avatar:string | null;
    setActive:(active:number)=>void;
    logOutHandler:any;
}

const SideBarProfile: FC<Props> = ({ user, active, avatar, setActive, logOutHandler }) => {
  return (
    <div className="w-full">
            <div className={`w-full flex items-center px-3 py-4 rounded-t-lg cursor-pointer gap-4 hover:dark:bg-slate-600 ${
                active===1 ? "dark:bg-slate-800 bg-white" :"bg-transparent"
            }`} onClick={()=>setActive(1)}>
                <Image
                    src={avatarDefault}
                    alt=''
                    width={10}
                    height={10}
                    className="w-[20px] h-[20px] 800px:w-[20px] 800px:h-[20px] cursor-pointer rounded-full"
                />
                <h5 className="800px:block hidden font-Poppins dark:text-white light:text-black">
                    My Account
                </h5>
            </div>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer gap-4 hover:dark:bg-slate-600 ${
                active===2 ? "dark:bg-slate-800 bg-white" :"bg-transparent"
            }`} onClick={()=>setActive(2)}>
                <RiLockPasswordLine size={20} className="dark:text-white text-black"/>
                <h5 className="800px:block hidden font-Poppins dark:text-white text-black">Change Password</h5>

            </div>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer gap-4 hover:dark:bg-slate-600 ${
                active===3 ? "dark:bg-slate-800 bg-white" :"bg-transparent"
            }`} onClick={()=>setActive(3)}>
                <SiCoursera size={20} className="dark:text-white text-black"/>
                <h5 className="800px:block hidden font-Poppins dark:text-white text-black">Enrolled Courses</h5>

            </div>  
            {
                user.role==="admin" && (
                    <Link href={"/admin"} className={`w-full flex items-center px-3 py-4 cursor-pointer gap-4 hover:dark:bg-slate-600 ${
                        active === 6 ? "dark:bg-slate-800 bg-white" :"bg-transparent" 
                    }`} onClick={()=>setActive(6)}>
                        <MdOutlineAdminPanelSettings size={20} className="dark:text-white text-black"/>
                        <h5 className="800px:block hidden font-Poppins dark:text-white text-black">Admin Dashboard</h5>
        
                    </Link> 

                )
            }

            <div className={`w-full flex items-center px-3 py-4 cursor-pointer gap-4 hover:dark:bg-slate-600 ${
                active===4 ? "dark:bg-slate-800 bg-white" :"bg-transparent"
            }`} onClick={()=>logOutHandler()}>
                <AiOutlineLogout size={20} className="dark:text-white text-black"/>
                <h5 className="800px:block hidden font-Poppins dark:text-white text-black">Log Out</h5>

            </div>     
        </div>
  )
}

export default SideBarProfile