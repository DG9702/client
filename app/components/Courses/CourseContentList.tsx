/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import {FaQuestionCircle, FaPlayCircle} from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import './courseContentList.css';
import { FaCircleCheck } from 'react-icons/fa6';
import { FaLock } from 'react-icons/fa';

type Props = {
  data: any;
  activeTrack?: number;
  setactiveTrack?: any;
  isDemo?: boolean;
  isMobile?: boolean;
  setMobile?: any;
  listAccessCourse?: boolean;
  user: any;
};

const CourseContentList: FC<Props> = ({
  data,
  activeTrack,
  setactiveTrack,
  isDemo,
  isMobile,
  setMobile,
  listAccessCourse,
  user
}) => {
  const [courseContentList, setCourseContentList] = useState<any>([]);
  const [totalSection, setTotalSection] = useState<number>();
  const [totalTrack, setTotalTrack] = useState<number>(0);
  const [totalTimeStep, setTotalTimeStep] = useState<number>();

  useEffect(() => {
    setCourseContentList(data);
  });

  const completedTracks = data?.reduce((acc: number, content: any) => {
    return (
      acc +
      content.tracks.filter((track: any) =>
        track?.userCompleted?.some((comp: any) => comp.userId === user?._id)
      ).length
    );
  }, 0);

  let totalPercent = 0;

  totalPercent = (completedTracks / totalTrack) * 100;

  useEffect(() => {
    let totalStep = 0;
    let totalTime = 0;
    setTotalSection(courseContentList?.length);
    data?.map((content: any, contentIndex: number) => {
      totalStep += content.tracks.length;
      content.tracks.map((track: any) => {
        totalTime += track.track_step?.duration;
      });
      setTotalTimeStep(totalTime);
    });
    setTotalTrack(totalStep);
  });

  const [isCollapsed, setIsCollapsed] = useState(
    Array(data?.length).fill(false)
  );

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const formatDuration = (duration: any, type: string) => {
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const formattedMinutes = minutes.toString();
    const formattedSeconds = seconds.toString().padStart(2, '0');

    if (duration < 10) {
      return type === 'chữ'
        ? `${formattedSeconds} giây`
        : `00:${formattedSeconds}`;
    } else if (duration >= 10 && duration < 60) {
      return type === 'chữ'
        ? `${formattedSeconds} giây`
        : `00:${formattedSeconds}`;
    } else if (duration >= 60 && duration < 600) {
      return type === 'chữ'
        ? `${formattedMinutes} phút`
        : `0${formattedMinutes}:${formattedSeconds}`;
    } else if (duration >= 600 && duration < 3600) {
      return type === 'chữ'
        ? `${formattedMinutes} phút`
        : `${formattedMinutes}:${formattedSeconds}`;
    } else {
      const hours = Math.floor(duration / 3600);
      const formattedHours = hours.toString().padStart(2, '0');
      return type === 'chữ'
        ? `${formattedHours} giờ ${formattedMinutes} phút ${formattedSeconds} giây`
        : `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
  };

  const isTrackLocked = (item: any, user: any) => {
    // Find the previous track based on position
    let previousTrack = null;
    for (const prevContent of courseContentList) {
      for (const prevTrack of prevContent?.tracks) {
        if (prevTrack.position === item?.position - 1) {
          previousTrack = prevTrack;
          break; // Exit the inner loop once a previous track is found
        }
      }
      // Check if a previous track is found within this or previous contents
      if (previousTrack) {
        break;
      }
    }

    // Check if the previous track is completed by the user
    return (
      previousTrack &&
      !previousTrack?.userCompleted?.some(
        (comp: any) => comp.userId === user?._id
      )
    );
  };  

  return (
    <div
      className={`${
        listAccessCourse ? 'flex flex-col w-full h-full overflow-y-auto' : ''
      } dark:bg-black`}
    >
      <div className={`pb-1 flex ${!listAccessCourse && "300px:flex-col"} 800px:flex-row items-center gap-4 justify-between`}>
        <h2
          className={`${
            listAccessCourse ? 'text-[18px] py-3 px-4' : 'text-[25px]'
          } font-[600] text-black dark:text-white`}
        >
          Nội dung khóa học
        </h2>
        {listAccessCourse===true&&(
          <>
            {isMobile ? (
              <button onClick={() => setMobile(false)} className='text-2xl pr-[30px]'>
                <IoClose />
              </button>
            ) : (
              <div className="flex items-center pr-[30px]">
                <div className="pie-wrapper relative">
                  <div
                    className={`absolute w-full h-full left-0 top-0 ${
                      totalPercent === 0 ? 'pi-none' : 'pie-container'
                    } `}
                  >
                    <div
                      style={{
                        transform: `rotate(calc(${totalPercent} * 3.6deg))`
                      }}
                      className="left-side half-circle"
                    ></div>
                    {totalPercent > 50 && (
                      <div className="right-side half-circle"></div>
                    )}
                  </div>
                  <div className="shadow-class"></div>
                  <div className="body">
                    <div className="percent">
                      <span className="">{totalPercent.toFixed(0)}</span>%
                    </div>
                  </div>
                </div>
                <p className="text-black text-base dark:text-white ml-1">
                  <strong className="pr-1">
                    <span>{completedTracks}</span>/<span>{totalTrack}</span>
                  </strong>
                  bài học
                </p>
              </div>  
            )}
          </>
        )}
        
        {!listAccessCourse && (
          <div className="mt-1 flex items-center text-lg ">
            <ul className="flex text-black dark:text-white">
              <li className="pr-1">
                <span className="font-semibold">{totalSection} </span>
                chương
              </li>
              <li className="pr-1"> • </li>
              <li className="pr-1">
                <span className="font-semibold">{totalTrack} </span>
                bài học
              </li>
              <li className="pr-1"> • </li>
              <li className="pr-1">
                Thời lượng <span>{formatDuration(totalTimeStep, 'chữ')}</span>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className={`${listAccessCourse ? 'mt-0' : 'mt-[20px]'} w-full $`}>
        {courseContentList?.map((content: any, index: number) => (
          <div key={index}>
            <div className={`${listAccessCourse === true ? '' : 'mb-2'}`}>
              <div
                className={`border border-[#ebebeb] 
                    ${
                      listAccessCourse === true
                        ? 'rounded-none bg-[#f7f8fa] dark:border-slate-900 hover:bg-[#edeff1]'
                        : 'rounded-md bg-[#f5f5f5] dark:border-none '
                    } dark:bg-[#121212]  cursor-pointer`}
                onClick={() => handleCollapseToggle(index)}
              >
                <h1 className="text-black dark:text-white">
                  <div
                    className={`py-4 pl-12 pr-[30px] flex items-center relative ${
                      isCollapsed[index]
                        ? "before:content-['+'] before:text-[26px]"
                        : "before:content-['-'] before:text-[40px]"
                    } before:top-[44%] before:absolute before:left-5 ${
                      listAccessCourse
                        ? 'before:text-[#423f3f]'
                        : 'before:text-[#2190ff]'
                    } before:translate-y-[-50%]`}
                  >
                    <span
                      className={`${
                        listAccessCourse ? 'text-base mr-2' : 'text-[20px]'
                      } font-medium`}
                    >
                      {index + 1}. {content.section}
                    </span>
                    <span
                      className={`ml-auto text-right ${
                        listAccessCourse ? 'text-base' : 'text-lg'
                      }`}
                    >
                      {content?.tracks.length} bài học
                    </span>
                  </div>
                </h1>
              </div>
              {/* lecture */}
              <div
                className={`${
                  isCollapsed[index] === false ? 'hidden' : 'block'
                }`}
              >
                {content?.tracks?.map((item: any, itemIndex: number) => (
                  <div
                    key={item.position}
                    className={`${
                      activeTrack === item?.position ? 'bg-sky-200' : ''
                    } flex items-center justify-between min-h-[48px] py-2 pl-[48px] pr-[30px] relative text-black dark:text-white ${
                      listAccessCourse ? 'text-base' : 'text-lg'
                    }
                        ${
                          listAccessCourse
                            ? item?.position > 0 && isTrackLocked(item, user)
                              ? 'cursor-not-allowed'
                              : 'cursor-pointer'
                            : 'cursor-default'
                        }
                    `}
                    onClick={() =>
                      isDemo
                        ? null
                        : item?.position > 0 && (listAccessCourse ? isTrackLocked(item, user) : false)
                          ? null
                          : setactiveTrack(item.position)
                    }
                  >
                    <div className={`${listAccessCourse ? 'w-[235px]' : ''}`}>
                      {item.typeTrack === 'lesson' ? (
                        <FaPlayCircle
                          className={`absolute ${
                            listAccessCourse
                              ? 'text-[#666] top-[20px]'
                              : 'text-[#2190ff] top-[17px] w-[14px] h-[14px]'
                          } mr-1 left-6 w-[16px] h-[16px] opacity-70`}
                        />
                      ) : (
                        <FaQuestionCircle
                          className={`absolute ${
                            listAccessCourse
                              ? 'text-[#666] top-[20px]'
                              : 'text-[#2190ff] top-[17px] w-[14px] h-[14px]'
                          } mr-1 left-6 w-[16px] h-[16px] opacity-70`}
                        />
                      )}
                      <p className="flex flex-col">
                        <span
                          className={`${
                            activeTrack === item?.position && 'font-semibold'
                          }`}
                        >
                          {item?.position}. {item?.track_step?.title}
                        </span>
                        {listAccessCourse && (
                          <span className="text-sm">
                            {formatDuration(item.track_step?.duration, 'số')}
                          </span>
                        )}
                      </p>
                    </div>
                    {listAccessCourse&&(
                      <>
                        {isTrackLocked(item, user) ? (
                          <FaLock
                            className="w-9 text-right text-gray-500"
                            title="Bạn cần hoàn thành bài học trước"
                          />
                          ) : item.userCompleted &&
                            item.userCompleted.some((comp: any) => comp.userId === user?._id
                          ) ? (
                          <FaCircleCheck className="w-9 text-right text-[#5db85c]" />
                        ) : null}
                      </>
                    )}
                    {!listAccessCourse && (
                      <span className="text-right ">
                        {formatDuration(item?.track_step?.duration, 'số')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContentList;
