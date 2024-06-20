'use client'
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {FiAlignJustify} from "react-icons/fi";
import {HiOutlineUserCircle} from "react-icons/hi";
import {useSelector} from 'react-redux';
import Image from 'next/image';

import NavItems from './NavItems/NavItems';
import {ThemeSwitcher} from '@/app/utils/ThemeSwitcher';
import CustomModal from '../CustomModal/CustomModal';
import Login from '../Auth/Login/Login';
import SignUp from '../Auth/SignUp/SignUp';
import Verification from '../Auth/Verification';
import avatar from '../../../public/assets/avatar.png'
import {useSession} from 'next-auth/react';
import {useLogoutQuery, useSocialAuthMutation} from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';

type Props = {
    open:boolean;
    setOpen:(open:boolean)=>void;
    activeItem:number;
    route: string;
    setRoute: (route: string) => void;
}


const Header: React.FC<Props> = ({activeItem, setOpen, open, route, setRoute}) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [active, setActive] = useState(false);
  const {user}=useSelector((state:any)=>state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);    
  const {}=useLogoutQuery(undefined,{
        skip:!logout ? true :false,
    })

  useEffect(()=>{
    if(!user){
      if(data){
        socialAuth({email:data?.user?.email,name:data?.user?.name,avatar:data.user?.image})
      }
    }
    if(data === null){
      if(isSuccess){
        toast.success("Login Successfully");
      }
    }
    if(data == null){
      setLogout(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data,user])

  if(typeof window!=="undefined"){
        window.addEventListener("scroll",()=>{
            if(window.scrollY>80){
                setActive(true)
            }else{
                setActive(false)
            }
        })
    }

    const handleClose=(e:any)=>{
        if(e.target.id==="screen"){
           {
             setOpenSidebar(false);
           } 
        }

    }  

  return (
    <div className='w-full relative z-10'>
        <div 
            className={`${active ? "dark:bg-opacity-50 dark:bg-[unset] bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" :"w-full border-b dark:border-[#ffffff1c] h-[80px] dark:shadow"}`}
        >
            <div className='w-[95%] 800px:w-[92%] m-auto py-2 h-full'>
                <div className='w-full h-[80px] flex items-center justify-between p-3'>
                    <div>
                        <Link 
                            href={"/"}
                            className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                        >
                            Dev Learning
                        </Link>
                    </div>
                    <div className='flex items-center'>
                        <NavItems
                            activeItem={activeItem}
                            isMobile={false}
                        />
                        <ThemeSwitcher/>
                        {/*only for mobile*/}
                        <div className='800px:hidden'>
                           <FiAlignJustify size={25} className="cursor-pointer dark:text-white text-black" onClick={()=>setOpenSidebar(true)}/>
                        </div>
                        {user ? (
                            <Link href={"/profile"}>
                                <Image 
                                    src={user.avatar ? user.avatar.url : avatar}
                                    alt=""
                                    width={30}
                                    height={30}
                                    style={{border:activeItem===5 ? "2px solid #ffc107" : "none"}}
                                    className="w-[30px] h-[30px] rounded-full cursor-pointer object-cover"
                                />
                            </Link>
                        ):(
                            <HiOutlineUserCircle
                            size={25}
                            className="cursor-pointer dark:text-white text-black"
                            onClick={()=>setOpen(true)}
                        />
                        )}
                    </div>
                </div>
            </div>
            {/*mobile sidebar*/}
            {
                openSidebar && (
                    <div id="screen" onClick={handleClose} className='dark:bg-[unset] bg-[#00000024] fixed w-full h-screen top-0 left-0 z-[99999]'>
                        <div className='h-screen w-[70%] fixed z-[999999999] bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
                            <NavItems isMobile={true} activeItem={activeItem}/>
                            
                                <HiOutlineUserCircle
                                size={25}
                                className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                                onClick={()=>setOpen(true)}
                            />
                            
                            <br/>
                            <br/>
                            <p className='text-[16px] px-2 pl-5 text-black dark:text-white'>
                                Copyright © 2023 ELearning
                            </p>
                        </div>
                    </div>

                )
            }
        </div>
        {/* Login */}
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              setRoute={setRoute}
              component={Login}
            />
          )}
        </>
      )}

      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              setRoute={setRoute}
              component={SignUp}
            />
          )}
        </>
      )}

      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              setRoute={setRoute}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Header