"use client"
import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {signIn} from "next-auth/react";
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiFillGithub,
    AiOutlineClose,
} from "react-icons/ai";
import { BiSolidError } from "react-icons/bi";
import { SiGithub } from "react-icons/si";

import {FcGoogle} from "react-icons/fc";
import {styles} from '../../Styles/style';
import {useLoginMutation} from '@/redux/features/auth/authApi';
import {FaGithub} from 'react-icons/fa';

type Props={
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
    email: Yup.string()
    .required("Vui lòng nhập email của bạn!")
    .email("Email không hợp lệ!"),
    password: Yup.string().required("Vui lòng nhập mật khẩu của bạn!").min(6,  "Mật khẩu tối thiểu 6 kí tự"),
});
const Login: React.FC<Props>=({setRoute, setOpen}) => {
    const [show, setShow]=useState<boolean>(false);

    const [login,{isSuccess,error}]=useLoginMutation()

    const formik = useFormik({
        initialValues: {email: "", password: ""},
        validationSchema: schema,
        onSubmit:async({email,password})=>{
            await login({email,password})
        },
    });

    useEffect(()=>{
        if(isSuccess){
            window.location.reload(); // Full page reload
        }
        if(error){
            if("data" in error){
                const errorData=error as any;
                toast.error(errorData.data.message)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess,error]);

    const {errors, touched, values, handleChange, handleSubmit} = formik;

    return (
        <div className="w-full">
            <header className="mt-14">
                <h1 className={`${styles.title}`}>
                    Đăng nhập
                </h1>
                <p className="text-black dark:text-white Roboto text-center opacity-70 mx-10">
                    Nhập email và mật khẩu của bạn để thực hiện đăng nhập vào hệ thống.  
                </p>
                <button
                    onClick={() => setOpen(false)}
                    className="fixed right-[10px] text-[#333] dark:text-[#fff] top-2 flex items-center p-5 text-base"
                >
                    <AiOutlineClose />  
                </button>
            </header>

            <form onSubmit={handleSubmit} className='mx-10'>
                <div className='w-full mt-5 relative mb-1'>
                    <label className={`${styles.label}`} htmlFor="email">
                        Email
                    </label>
                    <div
                        className={`${errors.email && touched.email&&"border-red-500"} relative flex border border-[#dee3e9] rounded justify-center  items-center my-2`}
                    >
                        <input
                            type="email"
                            name=""
                            value={values.email}
                            onChange={handleChange}
                            id="email"
                            placeholder="Nhập email"
                            className={` ${styles.input}`}
                        />
                        {errors.email&&touched.email&&(
                            <BiSolidError 
                                className="absolute top-1/2 -translate-y-2/4 right-4 z-10 fill-red-500"
                                size={20}
                            />
                        )}
                    </div>
                    {errors.email&&touched.email&&(
                        <span className="text-red-500 block">{errors.email}</span>
                    )}
                </div>

                <div className="w-full mt-5 relative mb-1">
                    <label className={`${styles.label}`} htmlFor="password">
                        Mật khẩu
                    </label>
                    <div
                        className={`${errors.password&&touched.password&&"border-red-500"} relative flex justify-center border 
                        border-[#dee3e9] rounded items-center my-2`}
                    >
                        <input
                            type={!show? "password":"text"}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            id="password"
                            placeholder="Nhập mật khẩu"
                            className={` ${styles.input}`}
                        />
                        {!show? (
                            <AiOutlineEyeInvisible
                                className="absolute top-1/2 -translate-y-2/4 right-4 z-10 cursor-pointer"
                                size={20}
                                onClick={() => setShow(true)}
                            />
                        ):(
                            <AiOutlineEye
                                className="absolute top-1/2 -translate-y-2/4 right-4 z-10 cursor-pointer"
                                size={20}
                                onClick={() => setShow(false)}
                            />
                        )}
                    </div>
                    {errors.password&&touched.password&&(
                        <span className="text-red-500 block">{errors.password}</span>
                    )}
                </div>
                <div className="w-full mt-10">
                    <input type="submit" value="Login" className={`${styles.button}`} />
                </div>
                <br />
                <h5 className="text-center pt-4 font-Roboto text-[14px] text-black dark:text-white">
                    Hoặc đăng nhập bằng
                </h5>
                <div className="flex items-center justify-center my-3">
                    <FcGoogle 
                        size={30} 
                        className="cursor-pointer mr-2"
                        onClick={()=>signIn("google")}
                    />
                    <FaGithub 
                        size={30} 
                        className="cursor-pointer text-[#000] dark:text-[#fff] ml-2 to-black"
                        onClick={()=>signIn("github")}
                    />
                </div>
                <h5 className="text-center pt-4 font-Roboto text-[14px] text-black dark:text-white">
                    Bạn chưa có tài khoản?{" "}
                    <span
                        className="text-[#2190ff] pl-1 cursor-pointer"
                        onClick={() => setRoute("Sign-Up")}
                    >
                        Đăng ký
                    </span>
                </h5>
                <h5
                    className="text-center pt-3 font-Roboto text-[14px] text-[#2190ff] cursor-pointer"
                    onClick={() => setRoute("forgot-password")}
                >
                    Quên mật khẩu
                </h5>
            </form>
        </div>
    )
}

export default Login