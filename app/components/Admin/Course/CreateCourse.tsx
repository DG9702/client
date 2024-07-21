'use client'
import React, {useEffect, useState} from 'react'
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import {useCreateCourseMutation} from '@/redux/features/courses/coursesApi';
import toast from 'react-hot-toast';
import {redirect, useRouter} from 'next/navigation';

type Props = {}

const CreateCourse = (props: Props) => {
    const [createCourse, { isLoading, isSuccess, error }] = useCreateCourseMutation();
    const router = useRouter();
    const [active, setActive] = useState(0);

    const [courseInfo, setCourseInfo] = useState({
        name: '',
        description: '',
        price: '',
        estimatedPrice: '',
        tags: '',
        level: '',
        categories: '',
        demoUrl: '',
        thumbnail: '',
    });

  const [benefits, setBenefits] = useState([{ title: '' }]);
  const [prerequisites, setPrerequisites] = useState([{ title: '' }]);
  const [courseContentData, setCourseContentData] = useState([]);

  const [courseData, setCourseData] = useState({});

  const handleSubmit = () => {
    // Format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    // Format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // Format course content array
    const formattedCourseContentData = courseContentData.map((section: any) => ({
        section: section.section,
        tracks: section.tracks.map((track: any) => {
          if (track.typeTrack === "lesson") {
            return {
              typeTrack: track.typeTrack,
              position: track.position,
              title: track.title,
              description: track.description,
              videoUrl: track.videoUrl,
              videoLength: track.videoLength,
              links: track.links,
              suggestion: track.suggestion,
            };
          } else if (track.typeTrack === "quiz") {
            return {
              typeTrack: track.typeTrack,
              position: track.position,
              title: track.title,
              description: track.description,
              duration: track.duration,
              content: track.content,
              questions: track.questions.map((question: any) => ({
                answer: question.answer,
                explanation: question.explanation,
                is_Correct: question.is_Correct
              })),
            };
          }
        }),
      }));    
    
      const data = {
        name: courseInfo.name,
        description: courseInfo.description,
        price: courseInfo.price,
        estimatedPrice: courseInfo.estimatedPrice,
        tags: courseInfo.tags,
        thumbnail: courseInfo.thumbnail,
        level: courseInfo.level,
        categories: courseInfo.categories, // Assuming categories exist
        demoUrl: courseInfo.demoUrl,
        totalSections: courseContentData.length,
        totalTracks: courseContentData.map((courseContent: any) => courseContent.tracks.length),
        benefits: formattedBenefits,
        prerequisites: formattedPrerequisites,
        courseData: formattedCourseContentData,
      };
      setCourseData(data);
    };
  

    const handleCourseCreate=async (e: any) => {
        if(!isLoading){
            await createCourse(courseData)
        }
  }
  
  useEffect(()=>{
        if(isSuccess){
            toast.success("Khóa học được tạo thành công")
            router.push(`/admin/courses`);
        }
        if(error){
            if("data" in error){
                const errorData=error as any;
                toast.error(errorData.data.message)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess,error]);

  return (
    <div className="w-full flex min-h-screen bg-sky-50 dark:bg-black">
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
                />
            )}
        </div>
        <div className="w-[20%] mt-[100px] h-screen fixed z-[10] top-18 right-0">
            <CourseOptions active={active} setActive={setActive} />
        </div>
    </div>
  )
}

export default CreateCourse