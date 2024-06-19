'use client'
import {redirect} from 'next/navigation';
import React, {FC, useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import CourseInformation from './CourseInformation';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import CourseOptions from './CourseOptions';
import {useEditCourseMutation, useGetAllCoursesQuery} from '@/redux/features/courses/coursesApi';

type Props={
    id: string
}

const EditCourse: FC<Props> = ({ id }) => {
    const [editCourse,{isSuccess,error}] = useEditCourseMutation({});

  const { data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const existingCourseData =
    data && data.courses.find((i: any) => i._id === id);

  //console.log(existingCourseData);

  useEffect(()=>{
    if(isSuccess){
      toast.success("Course updated successfully");
      redirect("/admin/courses");
    }
    if(error){
      if("data" in error){
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  },[isSuccess,error]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (existingCourseData) {
      setCourseInfo({
        name: existingCourseData.name,
        description: existingCourseData.description,
        price: existingCourseData.price,
        estimatedPrice: existingCourseData.estimatedPrice,
        tags: existingCourseData.tags,
        level: existingCourseData.level,
        demoUrl: existingCourseData.demoVideoUrl,
        thumbnail: existingCourseData?.thumbnail?.url,
      });
      setBenefits(existingCourseData.benefits);
      setPrerequisites(existingCourseData.prerequisites);
      setCourseContentData(existingCourseData.courseData);
    }
  }, [existingCourseData]);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength:"",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    // Format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    // Format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    // Format course content array
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    //prepare our data project
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoVideoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedCourseContentData,
    };
    setCourseData(data);
  };

//   console.log(courseData);

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    await editCourse({id:existingCourseData?._id,data});
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
}

export default EditCourse