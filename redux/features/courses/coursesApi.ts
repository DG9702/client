import { apiSlice } from '../api/apiSlice';

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: 'create-course',
        method: 'POST',
        body: data,
        credentials: 'include' as const
      })
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: 'get-admin-courses',
        method: 'GET',
        credentials: 'include' as const
      })
    }),
    //delete course
    deleteCourse: builder.mutation({
      query: ({ id }) => ({
        url: `delete-course/${id}`,
        method: 'DELETE',
        credentials: 'include' as const
      })
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: 'PUT',
        body: data,
        credentials: 'include' as const
      })
    }),

    //get all courses --user
    getUsersAllCourses: builder.query({
      query: () => ({
        url: `get-courses`,
        method: 'GET',
        credentials: 'include' as const
      })
    }),
    //get detail
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: 'GET',
        credentials: 'include' as const
      })
    }),
    getAdminCourseDetails: builder.query({
      query: (id) => ({
        url: `get-admin-course/${id}`,
        method: 'GET',
        credentials: 'include' as const
      })
    }),
    //get course content
    getCourseContent: builder.query({
      query: (id: any) => ({
        url: `get-course-content/${id}`,
        method: 'GET',
        credentials: 'include' as const
      })
    }),
    //get my courses
    getMyCourses: builder.query({
      query: (id: any) => ({
        url: `getMyCoursesByUser/${id}`,
        method: 'GET',
        credentials: 'include' as const
      })
    }),
    //add reviews
    addReviewInCourse: builder.mutation({
      query: ({ review, rating, courseId }: any) => ({
        url: `add-review/${courseId}`,
        body: {
          review,
          rating
        },
        method: 'PUT',
        credentials: 'include' as const
      })
    }),
    addReplyToReview: builder.mutation({
      query: ({ comment, courseId, reviewId }) => ({
        url: 'add-reply-review',
        body: {
          comment,
          courseId,
          reviewId
        },
        method: 'PUT',
        credentials: 'include' as const
      })
    }),
    //comment
    addCommentInContent: builder.mutation({
      query: ({ comment, courseId, trackId, typeTrack }: any) => ({
        url: `add-comment`,
        body: {
          comment,
          courseId,
          trackId,
          typeTrack
        },
        method: 'PUT',
        credentials: 'include' as const
      })
    }),
    addReplyToComment: builder.mutation({
      query: ({ reply, courseId, trackId, commentId, typeTrack }) => ({
        url: 'add-reply-comment',
        body: {
          reply,
          courseId,
          trackId,
          commentId,
          typeTrack
        },
        method: 'PUT',
        credentials: 'include' as const
      })
    }),
    //completed lesson
    addCompletedLesson: builder.mutation({
      query: ({ courseId, trackId, userId }) => ({
        url: `/completed-lesson`,
        body: {
          courseId,
          trackId,
          userId
        },
        method: 'PUT',
        credentials: 'include' as const
      })
    })
  })
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetUsersAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetAdminCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddReviewInCourseMutation,
  useAddReplyToReviewMutation,
  useAddCommentInContentMutation,
  useAddReplyToCommentMutation,
  useGetMyCoursesQuery,
  useAddCompletedLessonMutation
} = courseApi;
