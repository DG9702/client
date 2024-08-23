/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react'
import {GrLinkNext, GrNext, GrPrevious} from "react-icons/gr";
import { PiListBold } from "react-icons/pi";
import {styles} from '../Styles/style';
import NavItems from '../Header/NavItems/NavItems';
import {HiOutlineUserCircle} from 'react-icons/hi';
import CourseContentList from './CourseContentList';

type Props={
    data: any;
    activeTrack?: number;
    setActiveTrack?: any;
    isList?: boolean;
    setIsList: any;
    user: any;
}

const CourseContentBottom: FC<Props>=({data, activeTrack, setActiveTrack, isList, setIsList, user}) => {
    const [currentSection, setCurrentSection]=useState<any>();
    const [isCompleted, setIsCompleted]=useState(false);
    const [openMobile, setOpenMobile]=useState(false);

    useEffect(() => {
        data?.map((item: any, index: number) => {
            item?.tracks?.map((track: any) => {
                if(activeTrack===track.position) {
                    setCurrentSection(`${index+1} ${item.section}`);
                }
            })
        })
    });

    useEffect(() => {
        const currentTrack=data?.flatMap((section: any) => section.tracks).find((track: any) => track.position === activeTrack);;
        
        if (currentTrack) {
            setIsCompleted(currentTrack.userCompleted.some((comp: any) => comp.userId === user?._id));
        }
    }, [data, activeTrack, user])

    const handleBtn= (btn: any) => {
        if(activeTrack) {
            if(btn==='prev') {
                setActiveTrack(activeTrack-1)
            } else if(btn==='next') {
                setActiveTrack(activeTrack+1);
            }
        }
    }

    const handleClose=(e:any)=>{
        if(e.target.id==="screen"){
           {
             setOpenMobile(false);
           } 
        }

    }  
    
    const handleToggle=() => {
        setIsList(!isList);
        if (!isList && window.innerWidth < 1000) {
            setOpenMobile(true);
            setIsList(false)
        }
    }
    
  return (
      <>
          <div className='flex gap-4 300px:ml-2'>
              <button
                  className={`min-w-[138px] h-8 text-base font-semibold uppercase bg-[#0093fc] dark:bg-[#2190ff] rounded-[99px] ${activeTrack === 1 ? 'cursor-default opacity-60' : 'cursor-pointer opacity-100'}`}
                    onClick={activeTrack === 1 ? () => {} : ()=> handleBtn('prev')}
              >
                  <span className="inline-flex items-center justify-center gap-1 w-full h-full py-1 px-4 text-white">
                      <GrPrevious className='300px:hidden' size={16} />
                      <span>
                          Bài trước
                      </span>
                      
                  </span>
              </button>
              <button
                  className={`min-w-[138px] h-8 text-base font-semibold uppercase bg-[#0093fc] dark:bg-[#2190ff] rounded-[99px] ${isCompleted ? 'cursor-pointer opacity-100' : 'cursor-default opacity-60'} `}
                  onClick={!isCompleted ? () => {} : ()=> handleBtn('next')}
              >
                  <span className="inline-flex items-center justify-center gap-1 w-full h-full py-1 px-4 text-white">
                      <span>Bài tiếp theo</span>
                      <GrNext className='300px:hidden' size={16}  />
                  </span>
              </button>
          </div>
          <div className="absolute top-0 right-0 bottom-0 w-[30%] cursor-pointer flex justify-end items-center">
              <h3 className='text-base font-semibold 600px:block 300px:hidden'>{currentSection}</h3>
              <button
                  className='flex items-center justify-center flex-shrink w-9 h-9 text-base 
                    bg-white dark:bg-[#333] dark:text-white mx-2 cursor-pointer rounded-[50%]'
                    onClick={handleToggle}
              >
                  {!isList ? <PiListBold /> : <GrLinkNext  />}
              </button>
          </div>
          {/*mobile sidebar*/}
              {
                  openMobile && (
                  <div id="screen" onClick={handleClose}
                      className='dark:bg-[unset] bg-[#00000024] fixed w-full h-screen top-0 left-0 z-50'
                  >
                          <div className='h-screen 600px:w-[50%] 300px:w-full fixed z-50 bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
                            <CourseContentList
                                listAccessCourse={true}
                                isMobile={openMobile}
                                setMobile={setOpenMobile}
                                setactiveTrack={setActiveTrack}
                                data={data}
                                activeTrack={activeTrack}
                                user={user}                          
                            />
                          </div>
                      </div>
  
                  )
              }
      </>
  )
}

export default CourseContentBottom