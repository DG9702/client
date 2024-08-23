/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Ratings from '@/app/utils/Ratings';
import Link from 'next/link';
import React, { FC, useEffect, useRef, useState } from 'react';
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { styles } from '../Styles/style';
import CourseContentList from './CourseContentList';
import CoursePlayer from '@/app/utils/CoursePlayer';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { AiFillStar, AiOutlineClose, AiOutlineStar } from 'react-icons/ai';
import {
  useAddReplyToReviewMutation,
  useAddReviewInCourseMutation
} from '@/redux/features/courses/coursesApi';
import toast from 'react-hot-toast';
import { BiMessage } from 'react-icons/bi';
import { VscVerifiedFilled } from 'react-icons/vsc';
import {
  useCreateOrderMutation,
  useGetPayPalClientkeyQuery
} from '@/redux/features/orders/ordersApi';
import { redirect } from 'next/navigation';
import socketIO from 'socket.io-client';
import ReactPlayer from 'react-player';
import { PayPalButton } from 'react-paypal-button-v2';
import { FiPhone } from 'react-icons/fi';
import { CgMail } from 'react-icons/cg';
import { LiaMapMarkedAltSolid } from 'react-icons/lia';
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

type Props = {
  dataCourse?: any;
  clientSecret: string;
  //stripePromise:any;
  setRoute: any;
  setOpen: any;
  refetch: any;
};
const CourseDetails: FC<Props> = ({
  dataCourse,
  clientSecret,
  refetch,
  setRoute,
  setOpen: openAuthModal
}: Props) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();

  const [user, setUser] = useState<any>();

  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState('');
  const [reviewId, setReviewId] = useState();
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState('');
  const [rating, setRating] = useState(1);
  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading
    }
  ] = useAddReviewInCourseMutation();

  const [
    addReplyReview,
    { isSuccess: replySuccess, error: replyError, isLoading: replyLoading }
  ] = useAddReplyToReviewMutation();
  const playerRef = useRef<ReactPlayer | null>(null);

  const isReviewExist = dataCourse?.reviews?.find(
    (item: any) => item?.user?._id === user?._id
  );


  useEffect(() => {
    if (reviewSuccess) {
      setReviews('');
      refetch();
      setRating(1);
      socketId.emit('notification', {
        title: 'Nhận đánh giá mới',
        message: `Bạn có một đánh giá từ ${user?.name} tại ${dataCourse?.course?.name}`,
        userId: user._id
      });
      toast.success('Đánh giá khóa học thành công');
    }
    if (reviewError) {
      if ('data' in reviewError) {
        const errorMessage = reviewError.data as any;
        toast.error(errorMessage?.data?.message);
      }
    }
    if (replySuccess) {
      setReviews('');
      setRating(1);
      refetch();
      toast.success('Bạn đã trả lời đánh giá của người học');
    }
    if (replyError) {
      if ('data' in replyError) {
        const errorMessage = replyError.data as any;
        toast.error(errorMessage?.data?.message);
      }
    }
  }, [reviewSuccess, reviewError, replySuccess, replyError]);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const discountPercentenge =
    ((dataCourse?.estimatedPrice - dataCourse?.price) /
      dataCourse?.estimatedPrice) *
    100;
  const discountPercentengePrice = discountPercentenge?.toFixed(0);
  const isPurchased =
    user &&
    user?.courses?.find((item: any) => item.courseId === dataCourse?._id);

  useEffect(() => {
    if (orderData) {
      socketId.emit('notification', {
        title: 'Đơn đăng ký mới',
        message: `Bạn có một đơn đăng ký mới từ khóa học ${dataCourse?.course?.name}`,
        userId: user._id
      });
      toast.success('Đăng ký khóa học thành công');
      redirect(`/course-access/${dataCourse._id}`);
    }
    if (error) {
      if ('data' in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.mesage);
      }
    }
  }, [orderData, error]);

  const handleReviewSubmit = async () => {
    if (reviews.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({ review: reviews, rating, courseId: dataCourse._id });
    }
  };

  const handleReplyReviewSubmit = async () => {
    if (!replyLoading) {
      if (reply === '') {
        toast.error('Trả lời không được để trống');
      } else {
        addReplyReview({
          comment: reply,
          courseId: dataCourse._id,
          reviewId: reviewId
        });
        setIsReviewReply(false);
      }
    }
  };

  const [sdkReady, setSdkReady] = useState(false);
  const { data: config } = useGetPayPalClientkeyQuery({});

  const addPayPalScript = async () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://sandbox.paypal.com/sdk/js?client-id=${config.data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    if (window?.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  });

  //order
  const handleOrder = (e: any) => {
    if (user) {
      //createOrder({ courseId: data?._id });
      setOpen(true);
      if (dataCourse?.price === 0) {
        createOrder({
          courseId: dataCourse?._id,
          payment_info: {
            status: 'COMPLETED',
            intent: 'CAPTURE',
            purchase_units: [
              {
                reference_id: 'default',
                amount: {
                  currency_code: 'USD',
                  value: '2.00'
                },
                payee: {
                  email_address: user?.email,
                  merchant_id: 'YQZCHTGHUK5P8'
                },
                shipping: {
                  name: {
                    full_name: user?.name
                  }
                },
                payments: {
                  captures: [
                    {
                      id: '4M479861A00748515',
                      status: 'COMPLETED',
                      amount: {
                        currency_code: 'USD',
                        value: 0
                      },
                      final_capture: true,
                      disbursement_mode: 'INSTANT',
                      seller_protection: {
                        status: 'ELIGIBLE',
                        dispute_categories: [
                          'ITEM_NOT_RECEIVED',
                          'UNAUTHORIZED_TRANSACTION'
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        });
      }
    } else {
      setRoute('Login');
      openAuthModal(true);
    }
  };

  const onSuccessPaypal = (detail: any, data: any) => {
    setOpen(false);
    createOrder({ courseId: dataCourse?._id, payment_info: detail });
  };


  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] Roboto font-[600] text-black dark:text-white">
              {dataCourse?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={dataCourse?.ratings} />
                <h5 className="text-black dark:text-white">
                  {dataCourse?.reviews?.length} đánh giá
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {dataCourse?.purchased} người học
              </h5>
            </div>
            <br />
            <h1 className="text-[25px] Roboto font-[600] text-black dark:text-white">
              Bạn sẽ học được gì từ khóa học này?
            </h1>
            <div className="flex flex-wrap mt-1">
              {dataCourse?.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 400px:basis-full 600px:basis-3/6 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <FaCheck size={16} className="text-[#2190ff]" />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className="text-[25px] Roboto font-[600] text-black dark:text-white">
              Yêu cầu
            </h1>
            {dataCourse?.prerequisites?.map((item: any, index: number) => (
              <div
                className="w-full flex 400px:basis-full 600px:basis-3/6 800px:items-center py-2"
                key={index}
              >
                <div className="w-[15px] mr-1 font-medium">
                  <FaCheck size={16} className=" text-[#2190ff]" />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <div>
              <CourseContentList
                user={user}
                data={dataCourse?.courseData}
                isDemo={true}
              />{' '}
            </div>
            <br />
            <div className="w-full">
              <h1 className="text-[25px] Roboto font-[600] text-black dark:text-white">
                Mô tả khóa học
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                {dataCourse?.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={dataCourse?.ratings} />
                <div className="mb-2 800px:mb-[unset]" />
                <h5 className="text-[25px] Roboto text-black dark:text-white">
                  {Number.isInteger(dataCourse?.ratings)
                    ? dataCourse?.ratings?.toFixed(1)
                    : dataCourse?.ratings?.toFixed(2)}{' '}
                  Đánh giá khóa học • {dataCourse?.review?.length} đánh giá
                </h5>
              </div>
              <br />
              {(dataCourse?.review && [...dataCourse.review]?.reverse())?.map(
                (item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex">
                      <div className="w-[50px] h-[50px]">
                        <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                          <h1 className="uppercase text-[18px] text-black dark:text-white">
                            {item.user.name.slice(0, 2)}
                          </h1>
                        </div>
                      </div>
                      <div className="hidden 800px:block pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white">
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="text-black dark:text-white">
                          {item.comment}
                        </p>
                        <small className="text-[#000000d1] dark:text-[#ffffff83]">
                          {format(item.createdAt)} •
                        </small>
                      </div>
                      <div className="pl-2 flex 800px:hidden items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="w-full">
              <>
                <div className="flex w-full">
                  <img
                    src={
                      user?.avatar
                        ? user?.avatar?.url
                        : require('../../../public/assets/avatar.png')
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-[90%]">
                    <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                      Give a Rating <span className="text-red-500"></span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <div className="relative flex justify-center border border-[#dee3e9] rounded items-center w-full ml-3">
                      <textarea
                        name=""
                        value={reviews}
                        onChange={(e) => setReviews(e.target.value)}
                        id=""
                        cols={40}
                        rows={5}
                        placeholder="Nhập đánh giá của bạn..."
                        className={`${styles.input} !h-min !py-5`}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="w-[95%] flex justify-end">
                  <div
                    className={`${
                      styles.button
                    } !w-[150px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${
                      reviewCreationLoading
                        ? 'cursor-no-drop'
                        : 'cursor-pointer'
                    }`}
                    onClick={
                      reviewCreationLoading ? () => {} : handleReviewSubmit
                    }
                  >
                    Đánh giá
                  </div>
                </div>

                <br />
                <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
                <div className="w-full">
                  {(
                    dataCourse?.reviews && [...dataCourse.reviews].reverse()
                  )?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="w-full my-5 dark:text-white text-black"
                    >
                      <div className="w-full flex">
                        <div>
                          <img
                            src={
                              item?.user?.avatar
                                ? item?.user?.avatar?.url
                                : '../../../public/assets/avatar.png'
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>
                        <div className="ml-2">
                          <h1 className="text-[18px] text-black dark:text-white">
                            {item?.user.name}
                          </h1>
                          <Ratings rating={item.rating} />
                          <p className="text-base text-black dark:text-white">
                            {item?.review}
                          </p>
                          <small className="text-[#0000009e] dark:text-[#ffffff83]">
                            {format(item.createdAt)} *
                          </small>
                        </div>
                      </div>
                      {user?.role === 'admin' && (
                        <span
                          className={`${styles.label} !ml-14 cursor-pointer`}
                          onClick={() => {
                            setIsReviewReply(true);
                            setReviewId(item?._id);
                          }}
                        >
                          Phản hồi
                        </span>
                      )}
                      {isReviewReply && (
                        <div>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Nhập phản hồi của bạn..."
                            value={reply}
                            onChange={(e: any) => setReply(e.target.value)}
                            className={`${styles.input} !w-[90%] !ml-14 !border-b border-[#121212] dark:border-b-[#dee3e9]`}
                          />
                          <div className="mt-1 !ml-14 w-[90%] flex justify-end">
                            <button
                              type="submit"
                              className={`${styles.button_s} !text-white cursor-pointer`}
                              onClick={handleReplyReviewSubmit}
                            >
                              Gửi
                            </button>
                          </div>
                        </div>
                      )}

                      {item?.reviewReplies?.map((i: any, index: number) => (
                        <div
                          key={index}
                          className="w-full flex 800px:ml-16 my-5"
                        >
                          <div className="w-[50px] h-[50px]">
                            <img
                              src={
                                i?.user?.avatar
                                  ? i?.user?.avatar?.url
                                  : '../../../public/assets/avatar.png'
                              }
                              width={50}
                              height={50}
                              alt=""
                              className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                          </div>
                          <div className="pl-2">
                            <h5 className="text-lg">{i?.user.name}</h5>
                            <p>{i?.comment}</p>
                            <small className="text-[#0000009e] dark:text-[#ffffff83]">
                              {format(i?.createdAt)}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <br />
              </>
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 w-full">
              <div style={{ paddingTop: '48%', position: 'relative' }}>
                <ReactPlayer
                  ref={playerRef}
                  className="react-player"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                  url={`https://www.youtube.com/watch?v=${dataCourse?.demoUrl}`}
                  controls={true}
                  onBuffer={() => console.log('onBuffer')}
                  onError={(e) => console.log('onError', e)}
                  //onPlay={handlePlay}
                  //onProgress={
                  //  checkCompleted ?? accomplished ? () => {} : handleProgress
                  //}
                  onPlaybackQualityChange={(e: any) =>
                    console.log('onPlaybackQualityChange', e)
                  }
                />
              </div>
              <div className="flex items-center pl-[10px]">
                <h1 className="pt-5 text-[25px] text-black dark:text-white">
                  {dataCourse?.price === 0
                    ? 'Free'
                    : `${dataCourse?.price.toLocaleString('vi')}đ`}
                </h1>
                <h5 className="pl-3 text-[18px] mt-2 line-through opacity-80 text-black dark:text-white">
                  {`${
                    dataCourse?.estimatedPrice === 0
                      ? ''
                      : `${dataCourse?.estimatedPrice.toLocaleString('vi')}đ`
                  }`}
                </h5>
              </div>
              <div className="flex items-center pl-[10px]">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[180px] my-3 Roboto cursor-pointer !bg-[crimson]`}
                    href={`/course-access/${dataCourse._id}`}
                  >
                    Tiếp tục học
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[180px] my-3 Roboto cursor-pointer !bg-[crimson]`}
                    onClick={handleOrder}
                  >
                    Đăng ký học
                  </div>
                )}
              </div>
              <br />
              <div className="pl-[10px]">
                <p className="pb-1 text-black dark:text-white">
                  • Mã nguồn bao gồm
                </p>
                <p className="pb-1 text-black dark:text-white">
                  • Truy cập trọn đời
                </p>
                <p className="pb-1 text-black dark:text-white">
                  • Chứng chỉ hoàn tất
                </p>
                <p className="pb-3 800px:pb-1 text-black dark:text-white">
                  • Hỗ trợ tận tình
                </p>
              </div>
            </div>
          </div>
          <>
            {open && sdkReady && (
              <div className="w-full h-screen bg-[#00000036]  fixed top-0 left-0 z-50 flex items-center justify-center">
                <div className="w-[500px] min-h-[500px] text-black dark:bg-[#121212] dark:text-white bg-white rounded-xl shadow p-6">
                  <div className="flex justify-between my-4 relative item-center">
                    <h1 className="font-semibold text-2xl">
                      Thanh toán Paypal
                    </h1>
                    <button
                      onClick={() => setOpen(false)}
                      className="absolute right-4 top-2 flex item-center justify-center w-10 h-10 text-xl"
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                  <PayPalButton
                    amount={dataCourse?.price * 0.00004}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={onSuccessPaypal}
                    onError={() => alert('error')}
                  />
                  <div className="">
                    <h1 className="font-semibold text-xl">Liên hệ</h1>
                    <p className="text-base">
                      Tối đa 5 phút sau thời gian chuyển khoản, nếu hệ thống
                      không phản hồi vui lòng liên hệ ngay bộ phận hỗ trợ của
                      chúng tôi
                    </p>
                    <div className="">
                      <div className="flex items-start mb-4 text-base">
                        <FiPhone className="mt-1 mr-3" />
                        <a href="">0969231629</a>
                      </div>
                      <div className="flex items-start mb-4 text-base">
                        <CgMail className="mt-1 mr-3" />
                        <a href="">buihaibq9702@gmail.com</a>
                      </div>
                      <div className="flex items-start mb-4 text-base">
                        <LiaMapMarkedAltSolid className="mt-1 mr-3" />
                        <a href="">
                          96 Phố Định Công, Phương Liệt, Thanh Xuân, Hà Nội
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
