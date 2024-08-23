'use client'
import React, {useState} from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import {useSelector} from 'react-redux'
import MyCourse from '../components/MyCourse/MyCourse'

type Props = {}

const Page=(props: Props) => {
    const [open, setOpen]=useState<boolean>(false);
    const [activeItem, setActiveItem]=useState<any>(0);
    const [route, setRoute]=useState<string>("Login");
    const {user}=useSelector((state: any) => state.auth)

  return (
        <>
            <Protected>
                <Heading
                    title={`${user?.name} | Dev-Learning`}
                    description="Dev Learning is a platform for students to learn and get help from teachers"
                    keywords="Programming,MERN,Redux,Machine Learning"
                />
                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />
                <MyCourse user={user}  />
                <Footer  />
            </Protected>
        </>
    )
}

export default Page