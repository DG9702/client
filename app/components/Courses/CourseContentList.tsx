import React, {FC, useEffect, useState} from 'react'
import {BsChevronDown, BsChevronUp} from 'react-icons/bs';
import { FaQuestionCircle, FaPlayCircle } from "react-icons/fa";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props>=({
  data,
  activeVideo,
  setActiveVideo,
  isDemo
}) => {
  const [courseContentList, setCourseContentList]=useState([]);
  const [totalSection, setTotalSection]=useState<number>();
  const [totalTrack, setTotalTrack]=useState<number>();
  const [totalTimeStep, setTotalTimeStep]=useState<number>();

  useEffect(() => {
    setCourseContentList(data);
  })
  
  useEffect(() => {
    let totalStep=0;
    let totalTime=0;
    setTotalSection(courseContentList?.length);
    data.map((content: any, contentIndex: number) => {
      totalStep+=content.tracks.length;
      content.tracks.map((track: any) => {
        totalTime+=track.duration;    
      })
      setTotalTimeStep(totalTime);
    })
    setTotalTrack(totalStep);
  })  

  const [isCollapsed,setIsCollapsed]=useState(Array(data.length).fill(false))

  const handleCollapseToggle=(index:number)=>{
    const updatedCollapsed=[...isCollapsed];
    updatedCollapsed[index]=!updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
    console.log("Check: ", isCollapsed[index], index);
    
  }  

  const formatDuration = (duration: any, type: string) => {
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const formattedMinutes = minutes.toString();
    const formattedSeconds = seconds.toString().padStart(2, '0');

    if (duration < 10) {
      return type === "chữ" ? `${formattedSeconds} giây` : `00:${formattedSeconds}`;
    } else if (duration >= 10 && duration < 60) {
      return type === "chữ" ? `${formattedSeconds} giây` : `00:${formattedSeconds}`;
    } else if (duration >= 60 && duration < 600) {
      return type === "chữ" ? `${formattedMinutes} phút` : `0${formattedMinutes}:${formattedSeconds}`;
    } else if(duration>=600&&duration<3600) {
      return type === "chữ" ? `${formattedMinutes} phút` :`${formattedMinutes}:${formattedSeconds}`;
    } else {
      const hours = Math.floor(duration / 3600);
      const formattedHours = hours.toString().padStart(2, '0');
      return type==="chữ"? `${formattedHours} giờ ${formattedMinutes} phút ${formattedSeconds} giây`
        :`${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
  };

  return (
    <>
      <div className='pb-1'>
        <h2 className="text-[25px] font-[600] text-black dark:text-white">
            Nội dung khóa học
        </h2>
        <div className='mt-4 flex items-center text-lg '>
          <ul className='flex text-black dark:text-white'>
            <li className='pr-1'>
              <span className='font-semibold'>{totalSection} {" "}</span>
              chương 
            </li>
            <li className='pr-1'> • </li>
            <li className='pr-1'>
              <span className='font-semibold'>{totalTrack} {" "}</span>
              bài học 
            </li>
            <li className='pr-1'> • </li>
            <li className='pr-1'>
              Thời lượng {" "}
              <span>{formatDuration(totalTimeStep, "chữ")}</span>
              
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`mt-[20px] w-full $`}
      >
        {courseContentList.map((content: any, index: number) => (
          <>
            <div className='mt-5'>
              <div className='mb-2 '>
                <div 
                  className='border border-[#ebebeb] rounded-md bg-[#f5f5f5] dark:bg-[#121212] dark:border-none cursor-pointer'
                  onClick={()=>handleCollapseToggle(index)}
                >
                  <h1 className='text-black dark:text-white'>
                    <div
                      className={`py-4 pl-12 pr-[30px] flex items-center relative 
                      ${isCollapsed[index] ? "before:content-['+'] before:text-[26px]" : "before:content-['-'] before:text-[40px]"} before:top-[44%] before:absolute before:left-5 before:text-[#2190ff] before:translate-y-[-50%]`}
                    >
                      <span className='text-[20px] font-medium'>{index+1}. {content.section}</span>
                      <span
                        className='ml-auto text-right text-lg'
                      >
                        {content?.tracks.length} bài học
                      </span>
                    </div>
                  </h1>
                </div>
                {/* lecture */}
                <div className={`${isCollapsed[index] === false ? "hidden" : "block"}`}>
                  {content?.tracks?.map((item: any, itemIndex: number) => (
                    <div key={itemIndex}
                      className='flex items-center justify-between min-h-[48px] pl-[48px] pr-[30px] relative text-black dark:text-white text-lg'
                    >
                        <span>
                          {item.typeTrack === "lesson" ?
                            (
                              <FaPlayCircle
                                className='absolute text-[#2190ff] mr-1 top-[17px] left-6 w-[14px] h-[14px] opacity-70'
                              />
                            ) : (
                              <FaQuestionCircle
                                className='absolute text-[#2190ff] mr-1 top-[17px] left-6 w-[14px] h-[14px] opacity-70'
                              />
                            )}
                          {item.position}. {item.title}
                      </span>
                      <span className='text-right '>{formatDuration(item.duration, "số")}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default CourseContentList