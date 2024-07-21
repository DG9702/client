'use client'
import DashBoardHero from '@/app/components/Admin/DashboardHero'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import AllUsers from '@/app/components/Admin/Users/AllUsers'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div> 
      <AdminProtected>
        <Heading
            title="Manage Team | Dev-Learning - Admin"
            description="Dev-Learning is a platform for students to learn and get help from teachers"
            keywords="Programming, MERN, Redux, Machine Learning"
          />
          <div className="flex h-screen">
            <div className="1500px:w-[16%] w-1/5">
              <AdminSidebar />
            </div>
            <div className="w-[85%]">
              <DashBoardHero  />
              <AllUsers isTeam={true} />
          </div>
          </div>
      </AdminProtected>
    </div>
  )
}

export default page