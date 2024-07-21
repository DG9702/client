'use client';
import CourseContent from '@/app/components/Courses/CourseContent';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {
    params: any;
};

const CourseAccess = ({ params }: Props) => {
    const id = params.id;
    const { isLoading, error, data } = useLoadUserQuery(undefined, {});

    useEffect(() => {
        if (data) {
            const isPurchased = data.user.courses.find(
                (item: any) => item._id === id
            );
            if (!isPurchased) {
                redirect('/');
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <CourseContent id={id} user={data.user} />
                </div>
            )}
        </>
    );
};

export default CourseAccess;
