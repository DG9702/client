import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiFillGithub,
} from "react-icons/ai";
import { BiSolidError } from "react-icons/bi";
import toast from "react-hot-toast";

import {FcGoogle} from "react-icons/fc";
import {styles} from '../../Styles/style';
import {useRegisterMutation} from '@/redux/features/auth/authApi';

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
      setRoute("Verification");
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
        <div className="w-full 1000px:px-3">
            <h1 className={`${styles.title}`}>
                Đăng ký tài khoản Dev Learning
            </h1>

            <form onSubmit={handleSubmit}>
                <div className='w-full relative my-1'>
                    <label className={`${styles.label}`} htmlFor="name">
                        Tên của bạn
                    </label>
                    <div className='relative flex justify-center items-center my-2'>
                        <input
                            type="text"
                            name=""
                            value={values.name}
                            onChange={handleChange}
                            id="name"
                            placeholder="Nhập Tên của bạn"
                            className={`${errors.name && touched.name && "border-red-500"} ${styles.input}`}
                        />
                        {errors.name&&touched.name&&(
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
                    <div className='relative flex justify-center items-center my-2'>
                        <input
                            type="email"
                            name=""
                            value={values.email}
                            onChange={handleChange}
                            id="email"
                            placeholder="Nhập email"
                            className={`${errors.email && touched.email && "border-red-500"} ${styles.input}`}
                        />
                        {errors.email&&touched.email&&(
                            <BiSolidError 
                                className="absolute top-1/2 -translate-y-2/4 right-4 z-10 cursor-pointer fill-red-500"
                                size={20}
                            />
                        )}
                    </div>
                    {errors.email&&touched.email&&(
                        <span className="text-red-500 block">{errors.email}</span>
                    )}
                </div>

                <div className="w-full relative my-1">
                    <label className={`${styles.label}`} htmlFor="password">
                        Mật khẩu
                    </label>
                    <div className="relative flex justify-center items-center my-2">
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
                <div className="w-full mt-5">
                    <input type="submit" value="Sign Up" className={`${styles.button}`} />
                </div>
                <br />
                <h5 className="text-center pt-1 font-Poppins text-[14px] text-black dark:text-white">
                    Or join with
                </h5>
                <div className="flex items-center justify-center my-3">
                    <FcGoogle size={30} className="cursor-pointer mr-2"
                    //  onClick={()=>signIn("google")}
                    />
                    <AiFillGithub size={30} className="cursor-pointer ml-2 to-black"
                    //onClick={()=>signIn("github")}
                    />
                </div>
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                    Bạn đã có tài khoản?{" "}
                    <span
                        className="text-[#2190ff] pl-1 cursor-pointer"
                        onClick={() => setRoute("Login")}
                    >
                        Đăng nhập
                    </span>
                </h5>
            </form>
        </div>
    )
}

export default SignUp;