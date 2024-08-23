/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useState } from 'react';
import { styles } from '../Styles/style';
import toast from 'react-hot-toast';
import {
  useAddCommentInContentMutation,
  useAddReplyToCommentMutation
} from '@/redux/features/courses/coursesApi';
import * as timego from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';
timego.register('vi', vi);

import socketIO from 'socket.io-client';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

type Props = {
  id: any;
  user: any;
  content: any;
  refetch: any;
};

const CourseComment: FC<Props> = ({ id, user, content, refetch }) => {
  const [
    addNewComment,
    { isSuccess, error, isLoading: commentCreationLoading }
  ] = useAddCommentInContentMutation();
  const [
    addReplyToComent,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading
    }
  ] = useAddReplyToCommentMutation();

  const [comment, setComment] = useState('');

  //answer comment
  const [reply, setReply] = useState('');
  const [commentId, setCommentId] = useState('');
  const [isReplyComment, setIsReplyComment] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setComment('');
      refetch();
      socketId.emit('notification', {
        title: 'Đã nhận được hỏi đáp mới',
        message: `Bạn có một hỏi đáp tại ${content.title}`,
        userId: user._id
      });
      toast.success('Hỏi đáp được tạo thành công');
    }
    if (error) {
      if ('data' in error) {
        const errorMessage = error.data as any;
        toast.error(errorMessage?.data?.message);
      }
    }
    if (replySuccess) {
      setReply('');
      refetch();
      toast.success('Answer added successfully!');
      if (user.role !== 'admin') {
        socketId.emit('notification', {
          title: 'Nhận được câu trả lời cho hỏi đáp',
          message: `Bạn vừa nhận được một phản hồi cho câu hỏi của bạn là ${commentId} tại ${content.title}`,
          userId: user._id
        });
      }
    }
    if (replyError) {
      if ('data' in replyError) {
        const errorMessage = replyError.data as any;
        toast.error(errorMessage?.data?.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error, replySuccess, replyError]);
  //Xử lý comment

  const handleComment = async () => {
    if (comment.length === 0) {
      toast.error('Hỏi đáp không tồn tại');
    } else {
      const res = await addNewComment({
        comment,
        courseId: id,
        trackId: content?._id,
        typeTrack: content?.typeTrack
      });
    }
  };

  const handleReplyCommentSubmit = () => {
    if (!replyCreationLoading) {
      if (reply === '') {
        toast.error('Trả lời không được để trống');
      } else {
        addReplyToComent({
          reply,
          courseId: id,
          trackId: content?._id,
          commentId: commentId,
          typeTrack: content?.typeTrack
        });
        setIsReplyComment(false);
      }
    }
  };
  return (
    <div className="my-5 w-full">
      <div className="w-full md:w-[90%] m-auto">
        <div className="flex w-full">
          <img
            src={
              user?.avatar
                ? user?.avatar?.url
                : require('../../../public/assets/avatar.png')
            }
            className="object-cover rounded-full w-[50px] h-[50px] max-w-full"
            alt=""
          />
          <div className="relative flex justify-center border border-[#dee3e9] rounded items-center w-full ml-3">
            <textarea
              name=""
              id=""
              cols={30}
              rows={4}
              value={comment}
              onChange={(e: any) => setComment(e.target.value)}
              placeholder="Nhập bình luận mới của bạn"
              className={`${styles.input} !h-min !py-5`}
            ></textarea>
          </div>
        </div>
        <div className="w-full mt-10 flex justify-end">
          <input
            type="submit"
            onClick={commentCreationLoading ? () => {} : handleComment}
            value="Gửi"
            className={`${styles.button_s} cursor-pointer`}
          />
        </div>
      </div>
      <div className="w-full md:w-[90%] m-auto">
        {content?.comments?.map((i: any, index: number) => (
          <div key={index} className="w-full my-5">
            <div key={index} className=" flex">
              <div className="w-[50px] h-[50px]">
                <img
                  src={
                    i?.user?.avatar?.url ||
                    require('../../../public/assets/avatar.png')
                  }
                  width={50}
                  height={50}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
              </div>
              <div className="pl-2">
                <span className="flex items-center gap-2 text-base">
                  <span className="text-[#2190ff] font-semibold">
                    {i?.user?.name}
                  </span>
                  <span className="text-[#808b9a]">
                    {timego?.format(i?.createdAt, 'vi')}
                  </span>
                </span>
                <p>{i?.comment}</p>
              </div>
            </div>
            <div className="mt-1">
              <span
                className={`${styles.label} !ml-14 cursor-pointer hover:opacity-70`}
                onClick={() => {
                  setIsReplyComment(true);
                  setCommentId(i?._id);
                }}
              >
                Phản hồi
              </span>
            </div>
            {isReplyComment && commentId === i._id && (
              <div>
                <div className="flex items-center !w-[90%] !ml-14 !border-b border-b-[#dae4f0] dark:border-b-[#dee3e9]">
                  <span className="text-base font-semibold text-[#2190ff]">
                    @{i?.user?.name}
                  </span>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Nhập trả lời của bạn..."
                    value={reply}
                    onChange={(e: any) => setReply(e.target.value)}
                    className={`${styles.input} `}
                  />
                </div>
                <div className="mt-1 !ml-14 w-[90%] flex gap-2 justify-end">
                  <button
                    type="submit"
                    className={`text-[#5ebbff] border border-[#5ebbff] rounded min-h-[40px] w-[20%] px-6 cursor-pointer `}
                    onClick={() => setIsReplyComment(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className={`${styles.button_s} !text-white cursor-pointer`}
                    onClick={
                      replyCreationLoading ? () => {} : handleReplyCommentSubmit
                    }
                  >
                    Gửi
                  </button>
                </div>
              </div>
            )}

            {i?.commentReplies?.map((rep: any, index: number) => (
              <div key={index} className="w-full 800px:ml-16 my-5">
                <div key={index} className="flex">
                  <div className="w-[50px] h-[50px]">
                    <img
                      src={
                        rep?.user?.avatar
                          ? rep?.user?.avatar?.url
                          : '../../../public/assets/avatar.png'
                      }
                      width={50}
                      height={50}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full object-cover"
                    />
                  </div>
                  <div className="pl-2 flex flex-col gap-1">
                    <span className="flex items-center gap-2 text-base">
                      <span className="text-[#2190ff] font-semibold">
                        {rep?.user?.name}
                      </span>
                      <span className="text-[#808b9a]">
                        {timego?.format(rep?.createdAt, 'vi')}
                      </span>
                    </span>
                    <p>
                      <span className="text-base font-semibold text-[#2190ff]">
                        @{rep?.user?.name}
                      </span>
                      {rep?.reply}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseComment;
