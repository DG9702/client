/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiOutlineClose,
} from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { BiSolidError } from "react-icons/bi";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";
import {FcGoogle} from "react-icons/fc";
import {styles} from '../../Styles/style';
import {useRegisterMutation} from '@/redux/features/auth/authApi';
import {GrPrevious} from 'react-icons/gr';

type Props={
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên đăng nhập!"),
    email: Yup.string()
        .email("Email không hợp lệ!")
        .required("Vui lòng nhập email của bạn!"),
    password: Yup.string().required("Vui lòng nhập mật khẩu của bạn!").min(6),
});
const SignUp: React.FC<Props>=({setRoute, setOpen}) => {
    const [show, setShow]=useState<boolean>(false);
    const [register, {data, isSuccess, error}] = useRegisterMutation();

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
    }, [isSuccess, error]);

    const formik = useFormik({
        initialValues: {name: "", email: "", password: ""},
        validationSchema: schema,
        onSubmit: async ({ name, email, password }) => {
            const data = {
                name,
                email,
                password,
            };
            await register(data);
        },
    });

    const {errors, touched, values, handleChange, handleSubmit} = formik;

    return (
        <div className="w-full">
            <header className="mt-14">
                <button
                  onClick={() => setRoute("Login")}
                  className="fixed left-[10px] text-[#333] font-medium top-2 flex items-center p-5 text-base opacity-70 hover:opacity-100 dark:text-[#fff]"
                >
                    <GrPrevious />
                    Quay lại  
                </button>
                <h1 className={`${styles.title}`}>
                    Đăng ký
                </h1>
                <p className="text-black dark:text-white Roboto text-center opacity-70 mx-10">
                    Nhập đầy đủ thông tin của bạn để đăng ký tài khoản mới.  
                </p>
                <button
                    onClick={() => setOpen(false)}
                    className="fixed right-[10px] text-[#222] top-2 flex items-center p-5 text-base dark:text-[#fff]"
                >
                    <AiOutlineClose />  
                </button>
            </header>

            <form onSubmit={handleSubmit} className="mx-10">
                <div className='w-full relative my-1'>
                    <label className={`${styles.label}`} htmlFor="name">
                        Tên của bạn
                    </label>
                    <div
                        className={`${errors.name&&touched.name&&"border-red-500"} 
                                relative flex border border-[#dee3e9] rounded justify-center items-center my-2`}
                        >
                        <input
                            type="text"
                            name=""
                            value={values.name}
                            onChange={handleChange}
                            id="name"
                            placeholder="Nhập Tên của bạn"
                            className={`${styles.input}`}
                        />
                        {errors.name && touched.name&&(
                            <BiSolidError 
                                className="absolute top-1/2 -translate-y-2/4 right-4 z-10 cursor-pointer fill-red-500"
                                size={20}
                            />
                        )}
                    </div>
                    {errors.email&&touched.email&&(
                        <span className="text-red-500 block">{errors.name}</span>
                    )}
                </div>
                <div className='w-full my-1 relative'>
                    <label className={`${styles.label}`} htmlFor="email">
                        Email
                    </label>
                    <div
                        className={`${errors.email && touched.email && "border-red-500"} 
                        relative flex border border-[#dee3e9] rounded justify-center items-center my-2`}
                    >
                        <input
                            type="email"
                            name=""
                            value={values.email}
                            onChange={handleChange}
                            id="email"
                            placeholder="Nhập email"
                            className={`${styles.input}`}
                        />
                        {errors.email&&touched.email&&(
                            <BiSolidError 
                                className="absolute top-1/2 -translate-y-2/4 right-4 z-10 cursor-pointer fill-red-500"
                                size={20}
                            />
                        )}
                    </div>
                    {errors.email && touched.email &&(
                        <span className="text-red-500 block">{errors.email}</span>
                    )}
                </div>

                <div className="w-full relative my-1">
                    <label className={`${styles.label}`} htmlFor="password">
                        Mật khẩu
                    </label>
                    <div
                        className={`${errors.password&&touched.password&&"border-red-500"} 
                        relative flex border border-[#dee3e9] rounded justify-center items-center my-2`}
                    >
                        <input
                            type={!show? "password":"text"}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            id="password"
                            placeholder="Nhập mật khẩu"
                            className={`${errors.password&&touched.password&&"border-red-500"} ${styles.input}`}
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
                    <input type="submit" value="Sign Up" className={`${styles.button}`} />
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
                        color='#000000'
                        size={30} 
                        className="cursor-pointer ml-2 to-black"
                        onClick={()=>signIn("github")}
                    />
                </div>
                <br />
                <h5 className="text-center pt-4 Roboto text-[14px] text-black dark:text-white">
                    Bạn đã có tài khoản?{" "}
                    <span
                        className="text-[#2190ff] pl-1 cursor-pointer"
                        onClick={() => setRoute("Login")}
                    >
                        Đăng nhập
                    </span>
                </h5>
                <h5
                    className="text-center pt-2 font-Roboto text-[14px] text-[#2190ff] cursor-pointer"
                    onClick={() => setRoute("forgot-password")}
                >
                    Quên mật khẩu
                </h5>
            </form>
        </div>
    )
}

export default SignUp;