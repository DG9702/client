"use client"
import React, {FC} from 'react'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import CreateCourse from '@/app/components/Admin/Course/CreateCourse';
import {useSelector} from 'react-redux';

type Props = {}

const Page: FC<Props> = (props) => {
  const {user}=useSelector((state: any) => state.auth)  

  return (
    <div>
        <Heading 
        title="Dev Learning-Admin"
        description="Dev Learning is a platform for students to learn and get help from teachers"
        keywords='Programming,MERN,Redux,Machine Learning' />
        <div className='flex'>
            <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar />
            </div> 
            <div className="w-[85%] bg-sky-50">
                <DashboardHeader />
                <CreateCourse user={user}  />
            </div>
        </div>
    </div>
  )
}

export default Page