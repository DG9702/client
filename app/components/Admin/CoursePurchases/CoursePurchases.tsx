import React, {FC} from 'react';
import {
    useGetAdminCoursePurchasesQuery,
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

type Props={
    id?: any;
};

const CoursePurchases:FC<Props> = ({ id }) => {
  const {data,isLoading, refetch}=useGetAdminCoursePurchasesQuery(id, { refetchOnMountOrArgChange: true });    
    
  const analyticsData: any = [];

  data &&
    data.content.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
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
              Số lượt đăng ký của khóa học
            </h1>
            <p className={`${styles.label} px-5`}>
              Dữ liệu phân tích của 12 tháng qua{' '}
            </p>
          </div>

          <div className="mx-10 my-5 w-[90%] h-[60%] py-8 dark:bg-[#121212] bg-white shadow-md rounded-lg flex flex-col items-center justify-between">
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
        </div>
      )}
    </>
  );
};

export default CoursePurchases;
