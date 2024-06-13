'use client'
import React, {FC, useState} from 'react';
import Heading from '../utils/Heading'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Protected from '../hooks/useProtected';
import Profile from '../components/Profile/Profile';
import {useSelector} from 'react-redux';

type Props={}

const Page: FC<Props>=(props) => {
    const [open, setOpen]=useState<boolean>(false);
    const [activeItem, setActiveItem]=useState<any>(0);
    const [route, setRoute]=useState<string>("Login");
    const {user}=useSelector((state: any) => state.auth)

    return (
        <div>
            <Protected>
                <Heading
                    title={`${user?.name} | Dev-Learning`}
                    description="ELearning is a platform for students to learn and get help from teachers"
                    keywords="Programming,MERN,Redux,Machine Learning"
                />
                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />
            </Protected>
            <Profile user={user} />
        </div>
    )
}

export default Page