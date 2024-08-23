/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Heading from '@/app/utils/Heading';
import Loader from '../Loader/Loader';
import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi';
import CourseContentMedia from './CourseContentMedia';
import CourseContentList from './CourseContentList';
import CourseContentBottom from './CourseContentBottom';

type Props = {
  id: string;
  user: any;
};

const CourseContent: FC<Props> = ({ id, user }) => {
  const {
    data: contentData,
    isLoading,
    refetch
  } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true });
  const dataContent = contentData?.content;
  const [activeTrack, setActiveTrack] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login');
  const [isList, setIsList] = useState<boolean>(true);

  const isTrackLocked = (item: any, user: any) => {
    // Find the previous track based on position
    let previousTrack = null;
    for (const prevContent of dataContent) {
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

  useEffect(() => {
    dataContent?.map((section: any) => {
      section?.tracks?.map((track: any) => {
        if (
          !track?.userCompleted?.some(
            (comp: any) => comp.userId === user?._id
          ) &&
          !isTrackLocked(track, user)
        ) {
          setActiveTrack(track?.position);
        }
      });
    });
  }, [dataContent, user]);


  useEffect(() => {
    if (window.innerWidth < 1000) {
      setIsList(false);
    }
  }, [isList]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading
            title={'access'}
            description="anything"
            keywords={'keyword'}
          />
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          <div className="w-full">
            <div
              className={`${
                isList === true ? 'w-[75%]' : 'w-full'
              } overflow-y-scroll mt-20 top-0 left-0 fixed bottom-[50px]`}
            >
              <CourseContentMedia
                data={dataContent}
                id={id}
                activeTrack={activeTrack}
                setactiveTrack={setActiveTrack}
                user={user}
                refetch={refetch}
              />
            </div>
            <div
              className={`${
                isList === true ? '900px:block 900px:w-[25%]' : 'hidden'
              } border-l border-[#e7e7e7] 
                            mt-20 top-0 right-0 fixed bottom-[50px]`}
            >
              <CourseContentList
                listAccessCourse={true}
                setactiveTrack={setActiveTrack}
                data={contentData?.content}
                activeTrack={activeTrack}
                user={user}
              />
            </div>
          </div>
          <div className="bottom-0 left-0 right-0 fixed z-[2] bg-[#f0f0f0] shadow-sm flex 1000px:justify-center justify-between items-center h-[50px] text-black dark:text-white dark:bg-[#121212]">
            <CourseContentBottom
              data={contentData?.content}
              activeTrack={activeTrack}
              setActiveTrack={setActiveTrack}
              isList={isList}
              setIsList={setIsList}
              user={user}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
