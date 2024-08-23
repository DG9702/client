'use client'
import React, {FC, useState} from 'react';
import Heading from '../utils/Heading'
import Header from '../components/Header/Header'
import Hero from '../components/Home/Hero'
import Protected from '../hooks/useProtected';
import Profile from '../components/Profile/Profile';
import {useSelector} from 'react-redux';
import Footer from '../components/Footer/Footer';

type Props={}

const Page: FC<Props>=(props) => {
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
                <Profile user={user} />
                <Footer  />
            </Protected>
        </>
    )
}

export default Page