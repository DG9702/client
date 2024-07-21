"use client";

import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOulinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GropusIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  WysiwygIcon,
  QuizIcon,
  ManageHistoryIcon,
  SettingIcon,
  ExitToAppIcon,
} from "./Icons";
import avatarDefault from "../../../../public/assets/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography
        className="!text-[16px] !Roboto"
      >
        {title}
      </Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setlogout] = useState(false);
  const [isCollapsed, setIsCollapased] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setlogout(true);
  };
  return (
    <Box
      sx={{
        "& .pro-sidebar": {
          boxShadow: 1
        },
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#121212 !important" : "#fff !important"
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
          marginRight: "5px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#2190ff !important",
        },
        "& .pro-menu-item.active": {
          color: "#2190ff !important",
        },
        "& .pro-inner-item": {
          padding: "5px 15px 5px 15px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed? "0%":"16%",
          overflowY: "hidden",
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapased(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{ margin: "10px 0 20px 0" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/">
                  <h3 className="text-[25px] font-semibold uppercase dark:text-white text-black">
                    Dev Learning
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapased(!isCollapsed)}
                  className="inline-block"
                >
                  <ArrowBackIosIcon className="text-black dark:text-white" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={80}
                  height={80}
                  src={user?.avatar ? user?.avatar?.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ m: "10px 0 0 0" }}
                  className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize"
                >
                  - {`${user?.role === "admin" && "Quản trị viên"}`}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Tổng quan"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 10px" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!isCollapsed && "Người dùng"}
            </Typography>

            <Item
              title="Quản lý người dùng"
              to="/admin/users"
              icon={<GropusIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Đơn đăng ký"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0 5px 10px" }}
            >
              {!isCollapsed && "Khóa học"}
            </Typography>

            <Item
              title="Tạo khóa học"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Quản lý khóa học"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0 5px 10px" }}
            >
              {!isCollapsed && "Tùy chỉnh"}
            </Typography>

            <Item
              title="Biển hiệu"
              to="/admin/hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Câu hỏi thường gặp"
              to="/admin/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Thể loại"
              to="/admin/categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0 5px 10px" }}
            >
              {!isCollapsed && "Quản lý đội ngũ"}
            </Typography>

            <Item
              title="Đội ngũ"
              to="/admin/team"
              icon={<PeopleOulinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0 5px 10px" }}
            >
              {!isCollapsed && "Analytics"}
            </Typography>

            <Item
              title="Phân tích khóa học"
              to="/admin/courses-analytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Phân tích người dùng"
              to="/admin/users-analytics"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Phân tích đơn đăng ký"
              to="/admin/orders-analytics"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            

            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0 5px 10px" }}
            >
              {!isCollapsed && "Tiện ích"}
            </Typography>
            <Item
              title="Cài đặt"
              to="/admin/settings"
              icon={<SettingIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <div onClick={logoutHandler}>
              <Item
                title="Đăng xuất"
                to="/profile"
                icon={<ExitToAppIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
export default AdminSidebar;