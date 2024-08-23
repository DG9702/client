import {useGetCourseDetailsQuery} from '@/redux/features/courses/coursesApi';
import React, {FC, useEffect, useState} from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CourseDetails from './CourseDetails';

type Props={
    id: string;
}

const CourseDetailsPage: FC<Props>=({id}) => {
  const [route,setRoute]=useState("Login")
  const [open,setOpen]=useState(false)
  const {data,isLoading, refetch}=useGetCourseDetailsQuery(id, { refetchOnMountOrArgChange: true });
  const [clientSecret, setClientSecret]=useState('');  

  return (
      <>
        {isLoading ? (
          <><Loader /></>
        ) : (
          <>
            <Heading
              title={data?.course?.name + " | Dev-learning"}
              description={
                "It is a platform for students to learn and get help from teachersIt is a platform for students to learn and get help from teachers"
              }
              keywords={data?.course?.tags}
            />
            <Header
                route={route}
                setRoute={setRoute}
                open={open}
                setOpen={setOpen}
                activeItem={1}
            />
              <CourseDetails
                dataCourse={data.course}
                refetch={refetch}
                clientSecret={clientSecret}
                setRoute={setRoute}
                setOpen={setOpen} />
            <Footer />
          </>
        )}
      </>
  )
}

export default CourseDetailsPage