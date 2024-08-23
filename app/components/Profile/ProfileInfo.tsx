/* eslint-disable @next/next/no-img-element */
'use client'
import React, {FC, useEffect, useState} from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { styles } from '../Styles/style';
import avatarIcon from '../../../public/assets/avatar.png'
import {useEditProfileMutation, useUpdateAvatarMutation} from '@/redux/features/user/userApi';
import {useLoadUserQuery} from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';

type Props = {
    avatar:string | null;
    user:any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
    const [name,setName]=useState(user && user.name);
    const [loadUser,setLoadUser]=useState(false);

    const [updateAvatar,{isSuccess,error}]=useUpdateAvatarMutation();

    const [editProfile,{isSuccess:success,error:updateError}]=useEditProfileMutation();

    const {}=useLoadUserQuery(undefined,{
        skip:loadUser ? false : true
    })

    const handleImage=async (e: any) => {
        const file=e.target.files[0];
        const fileReader=new FileReader();
        
        fileReader.onload=()=>{
            if(fileReader.readyState === 2){
                const avatar=fileReader.result;
                updateAvatar(avatar)
            }
        }
        fileReader.readAsDataURL(e.target.files[0])
    }

    useEffect(()=>{
        if(isSuccess||success) {
            toast.success("Profile update successfully")
            setLoadUser(true)
        }
        if(error || updateError){
            console.log(error)
        }

        if (success) {
            toast.success("Profile update successfully")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess, error, success, updateError])

    const handleSubmit=async(e:any)=>{
        e.preventDefault()
        if(name!==""){
            await editProfile({
                name:name,
            })
        }
    }

  return (
    <>
        <div className='w-full flex justify-center'>
            <div className='relative'>
                <img
                    src={user?.avatar?.url || avatar ? user.avatar.url || avatar:avatarIcon}
                    alt=""
                    width={120}
                    height={120}
                    className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full'
                />
                <input 
                    type="file"
                    name=""
                    id="avatar"
                    className='hidden'
                    onChange={handleImage}
                    accept="image/png,image/jpg,image/jpeg,image/webp"
                />
                <label htmlFor="avatar">
                    <div className='w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer'>
                        <AiOutlineCamera size={20} className="z-1"/>
                    </div>
                </label>                 
            </div>
        </div>
        <br/>
        <div className='w-full pl-6 800px:pl-10'>
            <form onSubmit={handleSubmit}>
                <div className='800px:w-[50%] m-auto block pb-4'>
                    <div className='w-[100%]'>
                        <label className={styles.label}>Họ và tên</label>
                        <div className='relative flex justify-center border border-[#dee3e9] rounded items-center my-2'>
                            <input 
                                type="text" 
                                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                required 
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            
                            />    
                        </div>               
                    </div>
                    <div className='w-[100%] pt-2'>
                        <label className={styles.label}>Email</label>
                        <div className='relative flex justify-center border border-[#dee3e9] rounded items-center my-2'>
                            <input
                                  type="text"
                                  readOnly
                                  className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                                required
                                  value={user?.email}
                            />
                        </div>
                    </div>
                    <div className="w-full mt-10">
                        <input
                            className={styles.button}
                            required 
                            value="Update"
                            type="submit"
                        />
                    </div>
                </div>

            </form>

        </div>
    </>
  )
}

export default ProfileInfo