'use client'
import React, {FC, useState} from "react";
import {useSelector} from "react-redux";
import Footer from "../components/Footer/Footer";
import Heading from "../utils/Heading";
import Header from "../components/Header/Header";
import Policy from "./Policy";


type Props = {};

const Page: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState('Login');
  const { user } = useSelector((state: any) => state.auth);
  return (
    <>
      <Heading
            title="Chính sách bảo mật của Dev learning"
            description="Nơi có những khóa học lập trình online chất lượng"
            keywords="programming,mern"
        
        />
        <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            route={route}
            setRoute={setRoute}
        />
        <Policy />
        <Footer/>
    </>
  );
};

export default Page;