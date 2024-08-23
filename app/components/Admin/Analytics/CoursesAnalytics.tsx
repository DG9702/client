import React from 'react';
import {
  useGetCoursesAnalyticsQuery,
  useGetRevenuesAnalyticsQuery
} from '@/redux/features/analytics/analyticsApi';
import Loader from '../../Loader/Loader';
import { styles } from '../../Styles/style';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList
} from 'recharts';

type Props = {};

const CoursesAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  const { data: revenue } = useGetRevenuesAnalyticsQuery({});

  // const analyticsData = [
  //     { name: 'Jun 2023', uv: 3 },
  //     { name: 'July 2023', uv: 2 },
  //     { name: 'August 2023', uv: 5 },
  //     { name: 'Sept 2023', uv: 7 },
  //     { name: 'October 2023', uv: 2 },
  //     { name: 'Nov 2023', uv: 5 },
  //     { name: 'December 2023', uv: 7 },
  //   ];

  const analyticsData: any = [];
  const revenuesData: any = [];

  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  revenue &&
    revenue.revenues.last12Months.forEach((item: any) => {
      revenuesData.push({ name: item.month, uv: item.count });
    });

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[80px] mb-10 mx-10">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Phân tích khóa học
            </h1>
            <p className={`${styles.label} px-5`}>
              Dữ liệu phân tích của 12 tháng qua{' '}
            </p>
          </div>

          <div className="mx-10 my-5 w-[90%] h-[60%] py-8 dark:bg-[#121212] bg-white shadow-md rounded-lg flex flex-col items-center justify-between">
            <h1 className="text-black dark:text-white">
              Thống kê số lượng khóa học được tạo theo các tháng
            </h1>
            <ResponsiveContainer width="90%" height="70%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, 'auto']} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mx-10 w-[90%] h-[60%] py-8 dark:bg-[#121212] bg-white shadow-md rounded-lg flex flex-col items-center justify-between">
            <h1 className="text-black dark:text-white">
              Thống kê doanh thu theo các tháng
            </h1>
            <ResponsiveContainer width="90%" height="70%">
              <BarChart width={150} height={300} data={revenuesData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, 'auto']} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursesAnalytics;
