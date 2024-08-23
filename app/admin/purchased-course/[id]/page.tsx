'use client';
import CoursePurchases from '@/app/components/Admin/CoursePurchases/CoursePurchases';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import CourseContent from '@/app/components/Courses/CourseContent';
import Loader from '@/app/components/Loader/Loader';
import Heading from '@/app/utils/Heading';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {
    params: any;
};

const PurchasedCourse = ({ params }: Props) => {
    const id=params.id;

    
    
    return (
        <div>
            <Heading
            title="Courses Analytics | Dev-Learning - Admin"
            description="Dev Learning is a platform for students to learn and get help from teachers"
            keywords="Prograaming,MERN,Redux,Machine Learning"
            />
            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar />
                </div>
                <div className="w-[85%] bg-sky-50">
                <DashboardHeader />
                <CoursePurchases id={id} />
                </div>
            </div>
        </div>
    )
};

export default PurchasedCourse;
