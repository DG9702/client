'use client'
import {redirect} from 'next/navigation';
import React, {FC, useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import CourseInformation from './CourseInformation';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import CourseOptions from './CourseOptions';
import {useEditCourseMutation, useGetAdminCourseDetailsQuery, useGetCourseDetailsQuery} from '@/redux/features/courses/coursesApi';
import CourseContentEdit from './CourseContentEdit';

type Props={
    id: string
}

const EditCourse: FC<Props> = ({ id }) => {
    const [editCourse,{ isLoading, isSuccess, error }] = useEditCourseMutation({});

  const { data, refetch } = useGetAdminCourseDetailsQuery(id);
  
  const [active, setActive] = useState(0);
  const existingCourseData =
    data && data?.data;

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

  useEffect(() => {
    if (existingCourseData) {
      setCourseInfo({
        name: existingCourseData.name,
        description: existingCourseData.description,
        price: existingCourseData.price,
        estimatedPrice: existingCourseData.estimatedPrice,
        tags: existingCourseData.tags,
        level: existingCourseData.level,
        categoryId: existingCourseData.categoryId,
        demoUrl: existingCourseData.demoUrl,
        thumbnail: existingCourseData?.thumbnail?.url,
      });
      setBenefits(JSON.parse(JSON.stringify(existingCourseData.benefits)));
      setPrerequisites(JSON.parse(JSON.stringify(existingCourseData.prerequisites)));
      setCourseContentData(JSON.parse(JSON.stringify(existingCourseData.courseData)));
    }
  }, [existingCourseData]);

  const [courseInfo, setCourseInfo] = useState({
        name: '',
        description: '',
        price: '',
        estimatedPrice: '',
        tags: '',
        level: '',
        categoryId: '',
        demoUrl: '',
        thumbnail: '',
    });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([]);

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
      (section: any) => ({
        _id: section?._id,
        section: section.section,
        tracks: section.tracks.map((track: any) => {
          if (track.typeTrack === 'lesson') {
            return {
              trackId: track?.trackId,
              typeTrack: track.typeTrack,
              position: track.position,
              title: track?.title,
              description: track?.description,
              videoUrl: track?.videoUrl,
              duration: track?.duration,
              links: track?.links,
              suggestion: track?.suggestion
            };
          } else if (track.typeTrack === 'quiz') {
            return {
              trackId: track.trackId,
              typeTrack: track.typeTrack,
              position: track.position,
              title: track?.title,
              description: track?.description,
              duration: track?.duration,
              content: track?.content,
              questions: track?.questions.map((question: any) => ({
                answer: question.answer,
                explanation: question.explanation,
                is_Correct: question.is_Correct
              }))
            };
          }
        })
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
      categoryId: courseInfo.categoryId, // Assuming categories exist
      demoUrl: courseInfo.demoUrl,
      totalSections: courseContentData.length,
      totalTracks: courseContentData.map(
        (courseContent: any) => courseContent.tracks.length
      ),
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };
    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data=courseData;
    if(!isLoading) {
      await editCourse({id:existingCourseData?._id,data});
    }
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
          <CourseContentEdit
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
      <div className="w-[20%] mt-[100px] h-screen fixed z-[10] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
}

export default EditCourse