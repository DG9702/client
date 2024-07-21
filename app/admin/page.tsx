'use client'
import React, {FC} from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashBoardHero from "../components/Admin/DashboardHero";

type Props = {};

const page: FC<Props> = (props: Props) => {
  return (
    <> 
      <AdminProtected>
        <Heading
            title="Elearning - Admin"
            description="Elearning is a platform for students to learn and get help from teachers"
            keywords="Programming,MERN,Redux,Machine Learning"
          />
          <div className="flex h-[200vh]">
            <div className="1500px:w-[16%] w-1/5">
              <AdminSidebar />
            </div>
            <div className="w-[85%]">
              <DashBoardHero isDashboard={true} />
          </div>
          </div>
      </AdminProtected>
    </>
  );
};

export default page;