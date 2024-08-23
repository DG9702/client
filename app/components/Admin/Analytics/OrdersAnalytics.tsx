import React, { useEffect } from "react";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";
import {styles} from "../../Styles/style";

// const analyticsData = [
//   {
//     name: "Page A",
//     Count: 4000,
//   },
//   {
//     name: "Page B",
//     Count: 3000,
//   },
//   {
//     name: "Page C",
//     Count: 5000,
//   },
//   {
//     name: "Page D",
//     Count: 1000,
//   },
//   {
//     name: "Page E",
//     Count: 4000,
//   },
//   {
//     name: "Page F",
//     Count: 800,
//   },
//   {
//     name: "Page G",
//     Count: 200,
//   },
// ];

type Props = {
  isDashboard?: boolean;
};

export default function OrdersAnalytics({ isDashboard }: Props) {
  const {data, isLoading } = useGetOrdersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.name, Count: item.count });
    });  
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
          <div
            className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[60px] mx-10"}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Thống kê số lượng đăng ký khóa học
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Dữ liệu phân tích của 12 tháng qua{" "}
              </p>
            )}
          </div>
          <div
            className={`${
              !isDashboard ? "h-[60%]" : "h-full"
            } flex items-center justify-center w-[90%] py-8 dark:bg-[#121212] bg-white shadow-md rounded-lg mx-10`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "50%"}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}