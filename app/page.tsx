'use client'
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<any>(5);
  const [route, setRoute] = useState<string>("Login");

  return (
    <div>
      <Heading 
        title="Dev-Learning" 
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
      <Hero  />
    </div>
  )
}

export default Page;
