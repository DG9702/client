import React, { FC, useEffect, useRef, useState } from 'react';

import { styles } from '../../Styles/style';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import CoursePlayer from '@/app/utils/CoursePlayer';
import Ratings from '@/app/utils/Ratings';
import ReactPlayer from 'react-player';

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
  courseData,
  handleCourseCreate,
  setActive,
  active,
  isEdit
}) => {
  const [discountPercentengePrice, setDiscountPercentengePrice] =
    useState<any>();

  const playerRef = useRef<ReactPlayer | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let discountPercentenge = 0;
    if (courseData?.price === courseData?.estimatedPrice) {
      discountPercentenge = 0;
    } else {
      discountPercentenge =
        ((courseData?.estimatedPrice - courseData?.price) /
          courseData?.estimatedPrice) *
        100;
    }
    setDiscountPercentengePrice(discountPercentenge.toFixed(0));
  });
  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };
  return (
    <div className="w-[80%] m-auto py-5 px-6 my-5 bg-white text-black shadow-lg rounded-lg">
      <div className="w-full relative">
        <div className="dark:shadow-[bg-slate-700] bg-black relative px-[8.5%]">
          {/*<CoursePlayer title={content?.title} videoUrl={content?.videoUrl} />*/}
          <div className={`300px:pt-[60%] 800px:pt-[48%] relative`}>
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
              url={`https://www.youtube.com/watch?v=${courseData?.demoUrl}`}
              controls={true}
              onBuffer={() => console.log('onBuffer')}
              onError={(e) => console.log('onError', e)}
            />
          </div>
        </div>
        <div className="flex items-center">
            <h1 className="pt-5 text-[25px]">
                {courseData?.name}
            </h1>           
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? 'Free' : courseData?.price + ' VNĐ'}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {courseData?.estimatedPrice} VNĐ
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">
            {discountPercentengePrice}% giảm
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 Roboto !bg-[crimson] cursor-not-allowed`}
          >
            Đăng ký {courseData?.price} VNĐ
          </div>
        </div>
        <p className="pb-1">Mã nguồn bao gồm</p>
        <p className="pb-1">Truy cập trọn đời</p>
        <p className="pb-1">Chứng chỉ hoàn tất</p>
        <p className="pb-3">Hỗ trợ tận tình</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] Roboto font-[600]">{courseData?.name}</h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 đánh giá</h5>
            </div>
            <h5>0 người học</h5>
          </div>
          <br />
          <h1 className="text-[25px] Roboto font-[600]">
            Bạn sẽ học được gì từ khóa học này?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div className="w-[15px]. flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <h1 className="text-[25px] Roboto font-[600]">Yêu cầu</h1>
        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />

        <div className="w-full">
          <h1 className="text-[25px] Roboto font-[600]">Mô tả khóa học</h1>
          {courseData?.description}
        </div>
        <br />
        <br />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          onClick={() => prevButton()}
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#2190ff] text-center text-[#fff] rounded mt-8 cursor-pointer"
        >
          Quay lại
        </div>
        <div
          onClick={() => createCourse()}
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#2190ff] text-center text-[#fff] rounded mt-8 cursor-pointer"
        >
          {isEdit ? 'Cập nhật khóa học' : 'Tạo khóa học'}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
