/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import { Box, Button, Link, Modal } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineDelete } from 'react-icons/ai';
import {FiEdit2} from 'react-icons/fi';
import { IoAnalyticsSharp } from "react-icons/io5";

import { useTheme } from 'next-themes';
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery
} from '@/redux/features/courses/coursesApi';
import { styles } from '../../Styles/style';
import * as timego from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi'
timego.register('vi', vi);import toast from 'react-hot-toast';

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState('');

  const [deleteCourse, { isSuccess, error: deleteCourseError }] =
    useDeleteCourseMutation({});

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'title', headerName: 'Tên khóa học', flex: 1 },
    { field: 'ratings', headerName: 'Đánh giá', flex: 0.5 },
    { field: 'purchased', headerName: 'Số người đăng ký', flex: 0.5 },
    { field: 'created_at', headerName: 'Được tạo vào', flex: 0.5 },
    {
      field: '  ',
      headerName: 'Cập nhật',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit2 className="dark:text-white text-black" size={20} />
            </Link>
          </>
        );
      }
    },
    {
      field: ' ',
      headerName: 'Xóa',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setCourseId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      }
    },
 
  ];

  const rows: any = [];
  {
    data &&
      data.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          purchased: item.purchased,
          ratings: item.ratings,
          created_at: timego?.format(item?.createdAt, 'vi')
        });
      });
  }

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success('Course deleted successfully');
    }

    if (deleteCourseError) {
      if ('data' in deleteCourseError) {
        const errorMessage = deleteCourseError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, deleteCourseError]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse({ id });
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                outline: 'none'
              },
              '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
                color: theme === 'dark' ? '#fff' : '#000'
              },
              '& .MuiDataGrid-sortIcon': {
                color: theme === 'dark' ? '#fff' : '#000'
              },
              '& .MuiDataGrid-row': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderBottom:
                  theme === 'dark'
                    ? '1px solid #ffffff30!important'
                    : '1px solid #ccc!important'
              },
              '& .MuiTablePagination-root': {
                color: theme === 'dark' ? '#fff' : '#000'
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none'
              },
              '& .name-column--cell': {
                color: theme === 'dark' ? '#fff' : '#000'
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme === 'dark' ? '#2190ff' : '#5ebbff',
                borderBottom: 'none',
                color: theme === 'dark' ? '#fff' : '#000'
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: theme === 'dark' ? '#1F2A40' : '#F2F0F0'
              },
              '& .MuiDataGrid-footerContainer': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderTop: 'none',
                backgroundColor: theme === 'dark' ? '#2190ff' : '#5ebbff'
              },
              '& .MuiCheckbox-root': {
                color:
                  theme === 'dark' ? `#b7ebde !important` : `#000 !important`
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: `#fff !important`
              }
            }}
          >
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
              slotProps={{
                pagination: {
                  labelRowsPerPage: 'Dữ liệu trên mỗi trang'
                }
              }}
            />
          </Box>

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${styles.title}`}>
                  Có phải bạn đang muốn xóa khóa học này
                </h1>
                <div className="flex w-full items-center justify-between mb-6 mt-4">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    Hủy
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                    onClick={handleDelete}
                  >
                    Xóa
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
