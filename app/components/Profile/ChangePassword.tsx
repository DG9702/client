/* eslint-disable jsx-a11y/role-supports-aria-props */
'use client'
import React, {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {styles} from '../Styles/style';
import {useUpdatePasswordMutation} from '@/redux/features/user/userApi';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

type Props = {}

const schema = Yup.object().shape({
    oldPassword: Yup.string().required("Vui lòng nhập mật khẩu hiện tại!"),
    newPassword: Yup.string().required("Vui lòng nhập mật khẩu mới!").min(6, "Mật khẩu tối thiểu 6 kí tự"),
    confirmPassword: Yup.string().required("Vui lòng xác nhận mật khẩu mới!").min(6, "Mật khẩu tối thiểu 6 kí tự")
        .oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp'),
});

const ChangePassword = (props: Props) => {
    //const [oldPassword,setOldPassword]=useState("");
    //const [newPassword,setNewPassword]=useState("");
    //const [confirmPassword,setConfirmPassword]=useState("");
    const [updatePassword, {isSuccess, error}]=useUpdatePasswordMutation();
    
    const [showOldPass, setShowOldPass]=useState<boolean>(false);
    const [showNewPass, setShowNewPass]=useState<boolean>(false);
    const [showConfirmNewPass, setShowConfirmNewPass]=useState<boolean>(false);

     const formik = useFormik({
        initialValues: {oldPassword: "", newPassword: "", confirmPassword: ""},
        validationSchema: schema,
        onSubmit:async({oldPassword, newPassword, confirmPassword})=>{
            await updatePassword({oldPassword, newPassword})
        },
    });


    //const passwordChangeHandler=async(e:any)=>{
    //    e.preventDefault()
    //    if(newPassword !==confirmPassword){
    //        toast.error("Passwords do not match")
    //    }else{
    //        await updatePassword({oldPassword,newPassword})
    //    }

    //}
    useEffect(()=>{
        if(isSuccess){
            toast.success("Password changed successfully")
        }
        if(error){
            if("data" in error){
                const errorData=error as any;
                errors.oldPassword = errorData.data.message
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, error])
    
    const {errors, touched, values, handleChange, handleSubmit} = formik;

  return (
    <div className='w-full pl-7 px-2 800px:px-5 800px:pl-0'>
        <h1 className='block text-[25px] 800px:text-[30px] text-black Roboto text-center font-[500] dark:text-[#fff] pb-2'>
            Đổi mật khẩu
        </h1>
        <div className='w-full'>
            <form aria-required onSubmit={handleSubmit} className='flex flex-col items-center'>
                <div className='w-[100%] 800px:w-[60%] mt-5'>
                    <label className='block pb-2 text-black dark:text-[#fff]'>
                        Mật khẩu hiện tại
                    </label>
                    <div className="relative flex justify-center border border-[#dee3e9] rounded items-center my-2">
                        <input 
                            id='oldPassword'      
                            type={showOldPass ? "text" : "password"} 
                            className={`${errors.oldPassword && touched.oldPassword && "border-red-500"} ${styles.input}`}
                            required 
                            value={values.oldPassword}
                            onChange={handleChange}
                            placeholder='Nhập mật khẩu hiện tại của bạn'
                        />
                        {!showOldPass? (
                            <AiOutlineEyeInvisible
                                className="absolute top-1/2 -translate-y-2/4 right-8 z-10 cursor-pointer"
                                size={20}
                                onClick={() => setShowOldPass(true)}
                            />
                        ):(
                            <AiOutlineEye
                                className="absolute top-1/2 -translate-y-2/4 right-8 z-10 cursor-pointer"
                                size={20}
                                onClick={() => setShowOldPass(false)}
                            />
                        )}
                    </div>  
                    {errors.oldPassword && touched.oldPassword && (
                        <span className="text-red-500 block">{errors.oldPassword}</span>
                    )}
                </div>
                <div className='w-[100%] 800px:w-[60%] mt-2'>
                    <label className='block pb-2 text-black dark:text-[#fff]'>
                        Mật khẩu mới      
                    </label>
                    <div className="relative flex justify-center border border-[#dee3e9] rounded items-center my-2">
                        <input
                            id='newPassword'
                            type={showNewPass ? "text" : "password"}
                            className={`${errors.newPassword && touched.newPassword && "border-red-500"} ${styles.input}`}
                            required 
                            value={values.newPassword}
                            onChange={handleChange}
                            placeholder='Nhập mật khẩu mới của bạn'
                        />
                        {!showNewPass? (
                            <AiOutlineEyeInvisible
                                className="absolute top-1/2 -translate-y-2/4 right-8 z-10 cursor-pointer"
                                size={20}
                                onClick={() => setShowNewPass(true)}
                            />
                        ):(
                            <AiOutlineEye
                                className="absolute top-1/2 -translate-y-2/4 right-8 z-10 cursor-pointer"
                                size={20}
                                onClick={() => setShowNewPass(false)}
                            />
                        )}
                    </div>
                    {errors.newPassword && touched.newPassword && (
                        <span className="text-red-500 block">{errors.newPassword}</span>
                    )}
                </div>
                <div className='w-[100%] 800px:w-[60%] mt-2'>
                    <label className='block pb-2'>
                        Xác nhận mật khẩu mới
                    </label>
                    <div className="relative flex justify-center border border-[#dee3e9] rounded items-center my-2">
                        <input
                            id='confirmPassword'
                            type={showConfirmNewPass ? "text" : "password"}
                            className={`${errors.confirmPassword && touched.confirmPassword && "border-red-500"} ${styles.input}`}
                            required 
                            value={values.confirmPassword}
                            onChange={handleChange}
                            placeholder='Xác nhận mật khẩu mới của bạn'
                          />
                          {!showConfirmNewPass? (
                            <AiOutlineEyeInvisible
                                className="absolute top-1/2 -translate-y-2/4 right-8 z-10 cursor-pointer"
                                size={20}
                                onClick={() => setShowConfirmNewPass(true)}
                            />
                        ):(
                            <AiOutlineEye
                                className="absolute top-1/2 -translate-y-2/4 right-8 z-10 cursor-pointer"
                                size={20}
                                onClick={() => setShowConfirmNewPass(false)}
                            />
                        )}
                      </div>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <span className="text-red-500 block">{errors.confirmPassword}</span>
                    )}
                </div>
                <div className="w-[100%] 800px:w-[60%] mt-10">
                    <input
                        className={`${styles.button}`}
                        required 
                        value="Đổi mật khẩu"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    </div>
  )
}

export default ChangePassword