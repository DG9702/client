/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useState } from 'react';
import Ratings from '@/app/utils/Ratings';
import Link from 'next/link';
import { FaCirclePlay } from 'react-icons/fa6';
type Props = {
  item: any;
  isProfile?: boolean;
  myCourse?: boolean;
  user?: any;
  totalComp?: any;
  setTotalComp?: any;
};

const CourseCard: FC<Props> = ({ item, isProfile, myCourse, user, totalComp, setTotalComp }) => {
  const [lecture, setLecture] = useState<number>();
  const [totalTrack, setTotalTrack] = useState<number>(0);

  useEffect(() => {
    let totalLecture = 0;
    const courseData = item.courseData;
    for (let i = 0; i < courseData?.length; i++) {
      for (let j = 0; j < courseData[i].tracks.length; j++) {
        if (courseData[i].tracks[j].typeTrack === 'lesson') {
          totalLecture = totalLecture + 1;
        }
      }
    }
    setLecture(totalLecture);
  });

  useEffect(() => {
    let totalStep=0;
    item?.courseData?.map((content: any) => {
      totalStep += content.tracks.length;
    })
    setTotalTrack(totalStep);
  }, [item])

  const completedTracks = item?.courseData?.reduce((acc: number, content: any) => {
    return (
      acc +
      content.tracks.filter((track: any) =>
        track?.userCompleted?.some((comp: any) => comp.userId === user?._id)
      ).length
    );
  }, 0);

  let totalPercent = Math.min(Math.max(0, completedTracks / totalTrack * 100), 100);

  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
    >
      <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border-2 dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-md dark:shadow-inner">
        <img
          src={item?.thumbnail?.url}
          width={400}
          height={200}
          object-fit="contain"
          className="rounded w-full"
          alt=""
        />
        <br />
        <h1 className="Roboto text-[16px] text-black font-semibold dark:text-[#fff] line-clamp-2">
          {item.name}
        </h1>
        {myCourse ? (
          <>
            
          </>
        ) : (
            <>
              <div className="w-full flex items-center justify-between pt-2">
                <h5
                  className={`text-black dark:text-[#fff] ${
                    isProfile && 'hidden 800px:inline'
                  }`}
                >
                  {item.ratings} đánh giá
                </h5>
                <h5
                  className={`text-black dark:text-[#fff] ${
                    isProfile && 'hidden 800px:inline'
                  }`}
                >
                  {item.purchased} người học
                </h5>
              </div>
            
            </>
        )}
        {myCourse ? (
          <>
            <div className='flex mb-4 mt-3 items-center justify-between'>
              <p className='text-[#666] break-words text-sm'>Bạn đã hoàn thành</p>
              <p className="dark:text-white ml-1 text-[#666] break-words text-sm">
                <strong className="pr-1">
                  <span>{completedTracks}</span>/<span>{totalTrack}</span>
                </strong>
                nội dung
              </p>
            </div>
            <div className={`mt-4 mb-1 relative h-2 w-full rounded overflow-hidden bg-[#ddd]`}>
              <div className={`block absolute top-0 left-0 bottom-0 bg-[#2190ff]`}
                style={{ 
                  width: `${totalPercent.toFixed(0)}%`
                 }}
              ></div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex items-center justify-between py-3">
              <div className="flex">
                <h3 className="text-black dark:text-[#fff]">
                  {item.price === 0 ? 'Free' : `${item.price.toLocaleString('vi')}đ`}
                </h3>
                <h5 className="pl-3 text-[14px] line-through opacity-80 text-[#666] dark:text-[#fff]">
                  {item.estimatedPrice === 0 ? '' : `${item?.estimatedPrice.toLocaleString('vi')}đ`}
                </h5>
              </div>
              <div className="flex items-center">
                <FaCirclePlay
                  size={20}
                  className="text-[#666] dark:text-white"
                />
                <h5 className="pl-2 text-black dark:text-[#fff]">
                  {lecture} video
                </h5>
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;
