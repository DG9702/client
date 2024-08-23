'use client'
import React from 'react'
import EditCategories from '@/app/components/Admin/Customization/categories/EditCategories'
import DashBoardHero from '@/app/components/Admin/DashboardHero'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Admin | Dev Learning"
          description="Dev Learning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] bg-sky-50 ">
            <DashBoardHero />
            <EditCategories />
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default page