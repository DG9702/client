'use client'
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Home/Hero";
import Courses from "./components/Home/Courses";
import Review from "./components/Home/Review";
import FAQ from "./components/FAQ/FAQ";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<any>(5);
  const [route, setRoute] = useState<string>("Login");

  return (
    <>
      <Heading 
        title="Dev-Learning" 
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
      <Hero />
      <Courses />
      <FAQ  />
      <Footer />
    </>
  )
}

export default Page;
