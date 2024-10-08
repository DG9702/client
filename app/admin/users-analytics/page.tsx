'use client'
import UsersAnalytics from "@/app/components/Admin/Analytics/UsersAnalytics";
import DashBoardHero from "@/app/components/Admin/DashboardHero";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React, {FC} from "react";

type Props = {};

const page: FC<Props> = (props: Props) => {
  return (
    <> 
      <AdminProtected>
        <Heading
            title="Users Analytics | Dev-Learning - Admin"
            description="Dev Learning is a platform for students to learn and get help from teachers"
            keywords="Programming,MERN,Redux,Machine Learning"
          />
          <div className="flex h-[200vh]">
            <div className="1500px:w-[16%] w-1/5">
              <AdminSidebar />
            </div>
            <div className="w-[85%] bg-sky-50 ">
                <DashBoardHero />
                <UsersAnalytics  />
          </div>
          </div>
      </AdminProtected>
    </>
  );
};

export default page;