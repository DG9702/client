'use client'
import React, {useEffect, useState} from 'react'
import {useSearchParams} from 'next/navigation'
import Loader from '../components/Loader/Loader'
import Header from '../components/Header/Header'
import Heading from '../utils/Heading'
import CourseCard from '../components/Courses/CourseCard'
import Footer from '../components/Footer/Footer'
import {useGetAllCoursesQuery, useGetUsersAllCoursesQuery} from '@/redux/features/courses/coursesApi'
import {useGetHeroDataQuery} from '@/redux/features/layout/layoutApi'
import {styles} from '../components/Styles/style'

type Props = {}

const Page=(props: Props) => {
    const searchParams=useSearchParams();
    const search=searchParams?.get('title');
    const {data,isLoading}=useGetUsersAllCoursesQuery(undefined,{});
    const {data:categoriesData}=useGetHeroDataQuery("Categories",{});
    const [route,setRoute]=useState("Login")
    const [open,setOpen]=useState(false)
    const [courses,setCourses]=useState([])
    const [category, setCategory]=useState("All");

    const categories=categoriesData?.layout?.categories;

    useEffect(() => {
        if(!search) {
            if(category==="All"){
                setCourses(data?.courses);
            } if(category!=="All") {
                setCourses(
                    data?.courses.filter((item:any)=>item?.categoryId === category)
                )
            }
        }
        if(search){
            setCourses(data?.courses.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase())));

            if(category!=="All" && search) {
                setCourses(
                    data?.courses.filter((item: any) =>
                        item?.categoryId===category&&item.name.toLowerCase().includes(search.toLowerCase()
                )));
            }
            
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data,category,search])

  return (
    <div>
        {
            isLoading ? (
                <Loader />
            ):(
                <>
                    <Heading
                        title={"All courses | Dev Learning"}
                        description={"Dev learning is a programming community."}
                        keywords={"programming community,coding skills,expert insights,collaboration,growth"}    
                    />                
                    <Header
                       route={route}
                       setRoute={setRoute}
                       open={open}
                       setOpen={setOpen}
                       activeItem={1}                    
                    />
                    <div className='w-[95%] 800px:w-[85%] m-auto min-h-[70vh]'>
                        <br/>
                        <div className='w-full flex items-center flex-wrap'>
                            <div className={`h-[35px] ${category==="All" ? "bg-[crimson]" : "bg-[#5050cb]"} m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`} onClick={()=>setCategory("All")}>
                                All
                            </div>
                            {
                                categories && categories.map((item:any,index:number)=>(
                                    <div key={index}>
                                        <div
                                            className={`h-[35px] ${category===item._id? "bg-[crimson]":"bg-[#5050cb]"} m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                                            onClick={() => setCategory(item._id)}
                                        >
                                            {item.title}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            courses && courses.length===0 && (
                                <p className={`${styles.label} justify-center min-h-screen flex items-center`}>
                                    {search ? "Không tìm thấy khóa học nào" :"Thể loại không có khóa học nào"}

                                </p>
                            )
                        }
                        <br/>
                        <br/>
                        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4'>
                            {
                                courses && courses.map((item:any,index:number)=>(
                                    <CourseCard item={item} key={index}/>
                                ))
                            }
                        </div>


                    </div>
                    <Footer/> 
                </>
            )
        }
    </div>
  )
}

export default Page