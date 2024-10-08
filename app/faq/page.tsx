"use client"
import React, { useState } from 'react'
import Heading from '../utils/Heading';
import Header from '../components/Header/Header';
import FAQ from '../components/FAQ/FAQ';
import Footer from '../components/Footer/Footer';


type Props = {}

const Page = (props: Props) => {
    const [open,setOpen]=useState(false);
    const [activeItem,setActiveItem]=useState(4)
    const [route,setRoute]=useState("Login")

  return (
    <div className='min-h-screen'>
        <Heading
            title="FAQ - Elearning"
            description="Elearning is a learning management system for helping programmers."
            keywords="programming,mern"
        
        />
        <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            route={route}
            setRoute={setRoute}
        />
        <br/> 
        <FAQ />
        <Footer />


    </div>
  )
}

export default Page