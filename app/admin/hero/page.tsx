'use client'
import React from 'react'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import EditHero from '@/app/components/Admin/Customization/hero/EditHero';

type Props = {}

const page = (props: Props) => {
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
            <div className="w-[85%] bg-sky-50 ">
                  <DashboardHeader />
                  <EditHero  />
            </div>
        </div>
    </div>
  )
}

export default page