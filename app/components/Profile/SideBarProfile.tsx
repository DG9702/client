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
          <div className={`w-full flex items-center px-3 py-4 rounded-t-lg cursor-pointer gap-4  ${active===1?
              "text-white bg-[#344854]":"bg-transparent hover:dark:bg-[#282828] hover:bg-[#0000001a]"
            }`} onClick={()=>setActive(1)}>
                <Image
                    src={avatarDefault}
                    alt=''
                    width={10}
                    height={10}
                    className="w-[20px] h-[20px] 800px:w-[20px] 800px:h-[20px] cursor-pointer rounded-full"
                />
                <h5 className={`800px:block hidden Roboto dark:text-white ${active === 1 && "text-white"} text-black`}>
                    Trang cá nhân
                </h5>
            </div>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer gap-4 ${active===2?
              "text-white bg-[#344854]":"bg-transparent hover:dark:bg-[#282828] hover:bg-[#0000001a]"
            }`} onClick={()=>setActive(2)}>
                <RiLockPasswordLine size={20} className="dark:text-white text-black"/>
                <h5 className={`800px:block hidden Roboto dark:text-white ${active === 2 && "text-white"} text-black`}>Đổi mật khẩu</h5>

            </div>
            {
                user.role==="admin" && (
                    <Link href={"/admin"} className={`w-full flex items-center px-3 py-4 cursor-pointer gap-4 ${active===4?
                    "text-white bg-[#344854]":"bg-transparent hover:dark:bg-[#282828] hover:bg-[#0000001a]"
                    }`} onClick={()=>setActive(6)}>
                        <MdOutlineAdminPanelSettings size={20} className="dark:text-white text-black"/>
                        <h5 className={`800px:block hidden Roboto dark:text-white ${active===4&&"text-white"} text-black`}>
                          Trang quản lý
                        </h5>
        
                    </Link> 

                )
            }   
        </div>
  )
}

export default SideBarProfile