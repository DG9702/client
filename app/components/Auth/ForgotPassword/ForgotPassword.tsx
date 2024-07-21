'use client'
import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {
    AiOutlineClose 
} from "react-icons/ai";
import { GrPrevious } from "react-icons/gr";
import { BiSolidError } from "react-icons/bi";
import toast from "react-hot-toast";

import {FcGoogle} from "react-icons/fc";
import {styles} from '../../Styles/style';
import {useForgotPasswordMutation, useRegisterMutation} from '@/redux/features/auth/authApi';
import axios from 'axios';
import {useSelector} from 'react-redux';

type Props={
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
    email: Yup.string()
    .required("Vui lòng nhập email của bạn!")
        .email("Email không hợp lệ!"),
});

const ForgotPassword: React.FC<Props>=({setRoute, setOpen}) => {
    const [show, setShow]=useState<boolean>(false);
    const [forgotPassword, {data, isSuccess, error}]=useForgotPasswordMutation();

    const [otp, setOtp]=useState<string>();
    const [disabledOtp, setDisabledOtp]=useState<boolean>(true);
    const [messageOtp, setMessageOtp]=useState<string>();
    const [disabled, setDisabled]=useState<boolean>(true);

    const { token } = useSelector((state: any) => state.auth);


    useEffect(() => {
    if (isSuccess) {
        const message = data?.message || "send code Successfully";
        toast.success(message);
    //  formik.resetForm();
    //  setRoute("reset-password")
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
    console.log("Check: ", isSuccess, data, error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, error]);

    const formik = useFormik({
        initialValues: {email: ""},
        validationSchema: schema,
        onSubmit: async ({ email }) => {
            const data = {
                email,
            };
            await forgotPassword(data);
        },
    });

    console.log("Check message: ", data);
    
        
    const {errors, touched, values, handleChange, handleSubmit}=formik;

    useEffect(() => {
        if(!values.email) {
            setDisabledOtp(true)
        }

        if(values.email) {
            setDisabledOtp(false);
            if(token) {
                if(!otp) {
                    setMessageOtp("Trường này không được để trống");
                } else {
                    if(token?.resetCode===otp) {
                        setDisabled(false);
                        setMessageOtp("");
                    } else {
                        setMessageOtp("Mã xác nhận không hợp lệ");
                    }
                }
            }
        }
    });
    return (
        <div className="w-full">
            <header className="mt-14">
                <button
                  onClick={() => setRoute("Login")}
                  className="fixed left-[10px] text-[#333] font-medium top-2 flex items-center p-5 text-base opacity-70 hover:opacity-100 dark:text-[#fff]"
                >
                    <GrPrevious  />
                    Quay lại  
                </button>
                <h1 className={`${styles.title}`}>
                    Quên mật khẩu
                </h1>
                <p className="text-black dark:text-white Roboto text-center opacity-70 mx-10">
                    Nhập email của bạn và chúng tôi sẽ gửi cho bạn mã khôi phục mật khẩu.  
                </p>
                <button
                    onClick={() => setOpen(false)}
                    className="fixed right-[10px] text-[#333] font-semibold top-2 flex items-center p-5 text-base dark:text-[#fff]"
                >
                    <AiOutlineClose  />  
                </button>
            </header>

            <form
                onSubmit={handleSubmit}
                className='mx-10'
            >
                <div className='w-full relative my-2'>
                    <label className={`${styles.label}`} htmlFor="email">
                        Email của bạn
                    </label>
                    <div
                      className={`${errors.email&&touched.email&&"border-red-500"} relative flex border border-[#dee3e9] rounded justify-center  items-center my-2`}
                    >
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            id="email"
                            placeholder="Nhập email"
                            className={`${styles.input}`}
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

                <div className="w-full relative my-2">
                    <label className={`${styles.label}`} htmlFor="password">
                        Nhập mã xác nhận
                    </label>
                    <div
                      className={`${disabledOtp && "bg-[#16182329] opacity-70"} relative flex border border-[#dee3e9] rounded justify-center  items-center my-2`}
                    >
                        <input
                            type={"number"}
                            name=""
                            disabled={disabledOtp}
                            id="verificationCode"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Nhập mã xác nhận"
                            className={`${styles.input}`}
                        />
                        <button
                            id=''
                            type="submit"
                            disabled={disabledOtp}
                            value="forgot-password"
                            className={`${disabledOtp ? "cursor-not-allowed opacity-30" : "cursor-pointer"} ${styles.button_sm}`}
                        >
                            <span>Gửi mã</span>
                        </button>
                    </div>
                    {messageOtp && (
                        <span className="text-red-500 block">{messageOtp}</span>
                    )}
                </div>
                <div className="w-full mt-10">
                    <button
                        disabled={disabled}
                        id='resetPassword'  
                        onClick={() => setRoute("reset-password")}
                        className={`${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer opacity-100"} ${styles.button}`}
                    >
                      Đặt lại mật khẩu
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword