"use client";
import React, { useState } from 'react'
import DashboardHeader from './DashboardHeader';
import DashboardWidgets from './Widgets/DashboardWidgets';
//import DashboardWidgets from "../../components/Admin/Widgets/DashboardWidgets"

type Props = {
  isDashboard?:boolean;
}

const DashBoardHero = ({isDashboard}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
        <DashboardHeader open={open} setOpen={setOpen} />
        {
          isDashboard && (
            <DashboardWidgets open={open} />
          )
        }
    </>
  )
}

export default DashBoardHero;