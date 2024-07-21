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
      <AdminProtected>
        <Heading
            title="Users | Dev-Learning - Admin"
            description="Elearning is a platform for students to learn and get help from teachers"
            keywords="Programming,MERN,Redux,Machine Learning"
          />
          <body>
            <div className="flex h-screen">
              <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar />
              </div>
              <div className="w-[80%]">
                <DashBoardHero  />
                <AllUsers isTeam={false} />
              </div>
            </div>
          </body>
      </AdminProtected>
  )
}

export default page