"use client"
import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiOutlineClose,
} from "react-icons/ai";
import toast from "react-hot-toast";

import {FcGoogle} from "react-icons/fc";
import {styles} from '../../Styles/style';
import {useResetPasswordMutation} from '@/redux/features/auth/authApi';
import {GrPrevious} from 'react-icons/gr';
import {useSelector} from 'react-redux';

type Props={
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
    newPassword: Yup.string().required("Vui lòng nhập mật khẩu mới!").min(6, "Mật khẩu tối thiểu 6 kí tự"),
    confirmPassword: Yup.string().required("Vui lòng xác nhận mật khẩu mới!").min(6, "Mật khẩu tối thiểu 6 kí tự")
        .oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp'),
});

const ResetPassword: React.FC<Props>=({setRoute, setOpen}) => {
    const [show, setShow]=useState<boolean>(false);
    const [showNewPass, setShowNewPass]=useState<boolean>(false);
    const [showConfirmNewPass, setShowConfirmNewPass]=useState<boolean>(false);
    const { token } = useSelector((state: any) => state.auth);


    const [resetPassword, {data, isSuccess, error}] = useResetPasswordMutation();

    useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successfull";
      toast.success(message);
      formik.resetForm();
    //  setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
    console.log("Check: ", isSuccess, data, error);
    }, [isSuccess, error]);

    const formik = useFormik({
        initialValues: {newPassword: "", confirmPassword: ""},
        validationSchema: schema,
        onSubmit:async({newPassword, confirmPassword})=>{
            await resetPassword({
                newPassword: newPassword,
                resetCode: token?.resetCode,
                resetToken: token?.token,
            })
        },
    });

    console.log("Check token: ", token);
    

    const {errors, touched, values, handleChange, handleSubmit} = formik;

    return (
        <div className="w-full">
            <header className="mt-14">
                <h1 className={`${styles.title}`}>
                    Đặt lại mật khẩu
                </h1>
                <p className="text-black dark:text-white Roboto text-center opacity-70 mx-10">
                    Đặt mật khẩu mới cho tài khoản của bạn để có thể tiếp tục truy cập hệ thống.  
                </p>
                <button
                    onClick={() => setRoute("Login")}
                    className="fixed right-[10px] text-[#222] font-semibold top-2 flex items-center p-5 text-base opacity-70 dark:text-[#fff]"
                >
                    <AiOutlineClose  />  
                </button>
            </header>

            <form onSubmit={handleSubmit} className='mx-10'>

                <div className='w-full mt-5 relative mb-1'>
                    <label className={`${styles.label}`}>
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
                        />
                        {!showNewPass? (
                            <AiOutlineEyeInvisible
                                className="absolute top-1/2 -translate-y-2/4 right-8 z-10 text-black dark:text-white cursor-pointer"
                                size={20}
                                onClick={() => setShowNewPass(true)}
                            />
                        ):(
                            <AiOutlineEye
                                className="absolute top-1/2 -translate-y-2/4 right-8 z-10 text-black dark:text-white cursor-pointer"
                                size={20}
                                onClick={() => setShowNewPass(false)}
                            />
                        )}
                    </div>
                    {errors.newPassword && touched.newPassword && (
                        <span className="text-red-500 block">{errors.newPassword}</span>
                    )}
                </div>
                <div className='w-full mt-5 relative mb-1'>
                    <label className={`${styles.label}`}>
                        Xác nhận mật khẩu mới
                    </label>
                    <div className="relative flex justify-center border border-[#dee3e9]  rounded items-center my-2">
                        <input
                            id='confirmPassword'
                            type={showConfirmNewPass ? "text" : "password"}
                            className={`${errors.confirmPassword && touched.confirmPassword && "border-red-500"} ${styles.input}`}
                            required 
                            value={values.confirmPassword}
                            onChange={handleChange}
    
                          />
                          {!showConfirmNewPass? (
                            <AiOutlineEyeInvisible
                                className="absolute top-1/2 -translate-y-2/4 right-8 z-10 text-black dark:text-white cursor-pointer"
                                size={20}
                                onClick={() => setShowConfirmNewPass(true)}
                            />
                        ):(
                            <AiOutlineEye
                                className="absolute top-1/2 -translate-y-2/4 right-8 z-10 text-black dark:text-white cursor-pointer"
                                size={20}
                                onClick={() => setShowConfirmNewPass(false)}
                            />
                        )}
                      </div>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <span className="text-red-500 block">{errors.confirmPassword}</span>
                    )}
                </div>
                <div className="w-full mt-10">
                    <input type="submit" value="Đặt lại mật khẩu" className={`${styles.button} cursor-pointer`} />
                </div>
            </form>
        </div>
    )
}

export default ResetPassword;