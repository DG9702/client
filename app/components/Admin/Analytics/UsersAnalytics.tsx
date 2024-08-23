import React, { FC } from 'react';
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  Legend,
} from 'recharts';
import Loader from '../../Loader/Loader';
import { styles } from '../../Styles/style';

type Props = {
  isDashboard?: boolean;
};

const UsersAnalytics = ({ isDashboard }: Props) => {
  const {data,isLoading}=useGetUsersAnalyticsQuery({})
    const analyticsData:any=[];
    data && data.users.last12Months.forEach((item:any)=>{
        analyticsData.push({name:item.month,count:item.count})
    })
  
  return (
    <>
    {
        isLoading ? (
            <Loader/>

        ):(
            <div className={`${!isDashboard ? "mt-[50px]" : "mt-[50px] mx-10"}`}>
                <div className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[60px] mx-10"}>
                    <h1 className={`${styles.title} ${isDashboard && '!text-[20px]'} px-5 !text-start`}>
                        Thống kê lượng người dùng được tạo
                    </h1>
                    {
                        !isDashboard && (
                            <p className={`${styles.label} px-5`}>
                                Dữ liệu trong 12 tháng qua{" "}

                            </p>
                        )
                    }

                </div>
                <div className={`w-full ${isDashboard ? 'h-[60%]': 'h-screen'} flex items-center justify-center py-8 dark:bg-[#121212] bg-white shadow-md rounded-lg mx-10 w-[60%]`}>
                    <ResponsiveContainer width={isDashboard ? '100%':'90%'} height={!isDashboard ? "50%":"100%"}>
                        <AreaChart
                            data={analyticsData}
                            margin={{
                                top:20,
                                right:30,
                                left:0,
                                bottom:0
                            }}
                        >
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="#4d62d9"
                                fill="#4d62d9"
                            
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </div>

            </div>
        )
    }
    </>
  )

};

export default UsersAnalytics;
