import React, {useEffect, useState} from 'react'
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import CourseCard from '../Courses/CourseCard';

type Props = {}

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  //console.log(data);
  const [courses, setCourses] = useState<any[]>([]);

  console.log("Check data: ", data);
  
  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div className='my-4'>
      <div className="w-[90%] 800px:w-[80%] m-auto flex justify-center flex-col">
        <h1 className="text-center Roboto text-5xl py-2 leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
          <span className="text-gradient text-[#3558e1]">Các khóa học</span>
            {" "}phổ biến
          <br />
        </h1>
        <span className='text-black text-center font-Roboto text-base dark:text-white'>các khóa học toàn diện dựa trên dự án của chúng tôi</span>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[35px] mb-12">
          {courses &&
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Courses