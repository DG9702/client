import React, { FC, useEffect, useState } from "react";
import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";
type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props>=({item, isProfile}) => {
  const [lecture, setLecture]=useState<number>();
  
  useEffect(() => {
    let totalLecture = 0;
    const courseData=item.courseData;
    for (let i=0; i<courseData?.length; i++) {
      for(let j=0; j<courseData[i].tracks.length; j++) {
        if(courseData[i].tracks[j].typeTrack==="lesson") {
          
          totalLecture=totalLecture+1;
        }
      }
    }
    setLecture(totalLecture);
  })  
    
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
    >
      <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border-2 dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-md dark:shadow-inner">
        <Image
          src={item?.thumbnail?.url}
          width={400}
          height={200}
          objectFit="contain"
          className="rounded w-full"
          alt=""
        />
        <br />
        <h1 className="Roboto text-[16px] text-black font-semibold dark:text-[#fff] line-clamp-2">
          {item.name}
        </h1>
        <div className="w-full flex items-center justify-between pt-2">
          <h5
            className={`text-black dark:text-[#fff] ${
              isProfile && "hidden 800px:inline"
            }`}
          >
            {item.ratings} đánh giá
          </h5>
          <h5
            className={`text-black dark:text-[#fff] ${
              isProfile && "hidden 800px:inline"
            }`}
          >
            {item.purchased} người học
          </h5>
        </div>
        <div className="w-full flex items-center justify-between py-3">
          <div className="flex">
            <h3 className="text-black dark:text-[#fff]">
              {item.price === 0 ? "Free" : item.price}
            </h3>
            <h5 className="pl-3 text-[14px] line-through opacity-80 text-black dark:text-[#fff]">
              {item.estimatedPrice === 0 ? "" : item.estimatedPrice}
            </h5>
          </div>
          <div className="flex items-center">
            <FaCirclePlay size={20} className="text-[#666] dark:text-white" />
            <h5 className="pl-2 text-black dark:text-[#fff]">
              {lecture} video
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;