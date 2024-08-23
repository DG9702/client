/* eslint-disable react-hooks/exhaustive-deps */
import {
  useGetMyCoursesQuery,
  useGetUsersAllCoursesQuery
} from '@/redux/features/courses/coursesApi';
import React, { FC, useEffect, useState } from 'react';
import CourseCard from '../Courses/CourseCard';

type Props = {
  user: any;
};

const MyCourse: FC<Props> = ({ user }) => {
  const {data, isLoading}=useGetMyCoursesQuery(user._id);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    setCourses(data?.courses);
  });

  return (
    <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
      <div className='flex flex-col gap-4 mt-8 mb-16'>
        <h1 className='text-2xl font-bold text-[#242424] dark:text-white'>Khóa học đã đăng ký</h1>
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[35px] mb-12">
        {courses &&
          courses?.map((item: any, index: number) => (
            <CourseCard item={item} key={index} user={user} myCourse={true} />
          ))}
      </div>
    </div>
  );
};

export default MyCourse;
