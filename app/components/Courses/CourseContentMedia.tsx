/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import CoursePlayer from '@/app/utils/CoursePlayer';
import React, { FC, useEffect, useRef, useState } from 'react';
import { format, getDate, getTime, parseISO } from 'date-fns';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import CourseComment from './courseComment';

import ReactPlayer from 'react-player';
import toast from 'react-hot-toast';
import { useAddCompletedLessonMutation } from '@/redux/features/courses/coursesApi';
type Props = {
  data: any;
  id: string;
  activeTrack: number;
  setactiveTrack: (activeTrack: number) => void;
  user: any;
  refetch: any;
};


const CourseContentMedia: FC<Props> = ({
  refetch,
  data,
  id,
  activeTrack,
  setactiveTrack,
  user
}) => {
  //const [sections, setSections] = useState(data || []);
  const [content, setContent] = useState<any>();
  const [dateFormat, setDateFormat] = useState('');
  const [activeBtn, setActiveBtn] = useState(1);
  const [isSelect, setIsSelect] = useState(
    Array(content?.questions?.length).fill(false)
  );

  const [selectedExplanation, setSelectedExplanation] = useState('');

  useEffect(() => {
    data?.map((content: any) => {
      content.tracks.map((track: any, index: number) => {
        if (track.position === activeTrack) {
          setContent(track.track_step);
          //setActiveBtn(1);
        }
      });
    });
  }, [data, activeTrack]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (content?.updatedAt) {
      const result = parseISO(content?.updatedAt);
      const date = result.toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      setDateFormat(date);
    }
  }, [content]);

  const actionBtn = [
    {
      title: 'Mô tả',
      active: 1
    },
    {
      title: 'Hỏi đáp',
      active: 2
    }
  ];

  const handleActiveBtn = (active: number) => {
    if (active) {
      setActiveBtn(active);
    }
  };

  const handleIsSelectAnswer = (index: number) => {
    const updatedIsSelect = [...isSelect];
    updatedIsSelect[index] = !updatedIsSelect[index];

    updatedIsSelect.fill(false, 0, index);
    updatedIsSelect.fill(false, index + 1);

    setIsSelect(updatedIsSelect);
  };

  const handleAnswer = () => {
    const selectedAnswerIndex = isSelect.findIndex((value) => value === true);
    const selectedAnswerIsCorrect =
      content?.questions[selectedAnswerIndex]?.is_Correct;

    // Update isSelect array with the new border color based on correctness
    setIsSelect(
      isSelect.map((isSelected, index) => {
        if (index === selectedAnswerIndex) {
          return selectedAnswerIsCorrect ? '#48bd79' : '#cc5140';
        } else {
          return isSelected;
        }
      })
    );

    setSelectedExplanation(
      content?.questions[selectedAnswerIndex]?.explanation
    );

    if(selectedAnswerIsCorrect===true) {
      console.log("Trả lời đúng");
      addCompletedLesson({
        courseId: id,
        trackId: content._id,
        userId: user._id
      });
    }
  };  

  //mark complete
  //const [state, setState] = useState(initialState);
  const playerRef = useRef<ReactPlayer | null>(null);
  const [isSeeking, setIsSeeking] = useState(false); // Track seeking state
  const [startTime, setStartTime] = useState<number | null>(null);
  const [accomplished, setAccomplished] = useState<boolean>(false);

  const [
    addCompletedLesson,
    { isSuccess, error, isLoading: commentCreationLoading }
  ] = useAddCompletedLessonMutation();

  const handleProgress = (state: any) => {
    if (playerRef.current) {
      const videoElement = playerRef.current.getInternalPlayer();
      if (videoElement && startTime) {
        const endTime = Date.now();

        if (
          (endTime - startTime) / 1000 >= content?.duration * 0.6 &&
          !accomplished
        ) {
          // Thực hiện các hành động khác khi xem được 10%
          addCompletedLesson({
            courseId: id,
            trackId: content._id,
            userId: user._id
          });
          setAccomplished(true);
        }
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success('Đã hoàn thành bài học');
    }
    if (error) {
      if ('data' in error) {
        const errorMessage = error.data as any;
        toast.error(errorMessage?.data?.message);
      }
    }
  }, [isSuccess, error]);

  const checkCompleted = content?.userCompleted?.some(
    (comp: any) => comp.userId === user?._id
  );

  const handlePlay = () => {
    if (startTime === null) {
      setStartTime(Date.now());
    }
  };  

  return (
    <>
      {content && content.typeTrack === 'lesson' && (
        <div>
          <div className="dark:shadow-[bg-slate-700] bg-black relative px-[8.5%]">
            {/*<CoursePlayer title={content?.title} videoUrl={content?.videoUrl} />*/}
            <div className={`300px:pt-[60%] 800px:pt-[48%] relative`}>
              <ReactPlayer
                ref={playerRef}
                className="react-player"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
                url={`https://www.youtube.com/watch?v=${content?.videoUrl}`}
                controls={true}
                onBuffer={() => console.log('onBuffer')}
                onError={(e) => console.log('onError', e)}
                onPlay={handlePlay}
                onProgress={
                  checkCompleted ?? accomplished ? () => {} : handleProgress
                }
                onPlaybackQualityChange={(e: any) =>
                  console.log('onPlaybackQualityChange', e)
                }
              />
            </div>
          </div>

          <div className="px-[8.5%] min-h-[440px] dark:bg-black dark:text-white text-[#292929] pt-12">
            <div>
              <h1 className=" text-[28px] font-semibold">{content?.title}</h1>
              <span className="mb-[36px]">Cập nhật {dateFormat}</span>
            </div>
            <div className="border-b dark:border-b-[#ffffff21]">
              <div className="flex p-1 gap-2 items-center flex-wrap">
                {actionBtn.map((item) => (
                  <>
                    <button
                      onClick={() => handleActiveBtn(item.active)}
                      className="px-3 py-1 flex justify-center items-center cursor-pointer h-8 hover:opacity-70 mt-4 relative"
                    >
                      {activeBtn === item.active && (
                        <span className="opacity-100 bg-black rounded-none w-[80%] bottom-0 z-0 absolute h-[2px]"></span>
                      )}
                      <div
                        className={`relative text-xl z-10 ${
                          activeBtn === item.active && 'font-semibold'
                        }`}
                      >
                        {item.title}
                      </div>
                    </button>
                  </>
                ))}
              </div>
            </div>
            {activeBtn === 1 && (
              <div className="text-lg py-3 min-h-[300px]">
                <p className="my-4">{content?.description}</p>
                <ul className="my-4 pl-6 list-disc">
                  {content?.links.map((link: any, index: number) => (
                    <li key={index} className="">
                      {link.title}{' '}
                      <Link
                        className="underline text-[#5ebbff] dark:text-[#2190ff]"
                        href={link.url}
                      >
                        {link.url}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeBtn === 2 && (
              <CourseComment
                id={id}
                user={user}
                content={content}
                refetch={refetch}
              />
            )}
            <p className="text-[#666] text-center text-base py-[30px]">
              Made with{' '}
              <FaHeart
                className="inline-block"
                fill="currentColor"
                color="#d43c68"
              />
              <span className="px-[6px]">.</span>
              Powered by Dev Learning
            </p>
          </div>
        </div>
      )}
      {content && content?.typeTrack === 'quiz' && (
        <div className="w-[720px] mt-[48px] mx-auto mb-100px text-black dark:text-white">
          <h1 className=" text-[28px] font-semibold">{content?.title}</h1>
          <p className="text-base">Cập nhật {dateFormat}</p>
          <div>
            <div className="border-b dark:border-b-[#ffffff21]">
              <div className="flex p-1 gap-2 items-center flex-wrap">
                {actionBtn.map((item) => (
                  <>
                    <button
                      onClick={() => handleActiveBtn(item.active)}
                      className="px-3 py-1 flex justify-center items-center cursor-pointer h-8 hover:opacity-70 mt-4 relative"
                    >
                      {activeBtn === item.active && (
                        <span className="opacity-100 bg-black rounded-none w-[80%] bottom-0 z-0 absolute h-[2px]"></span>
                      )}
                      <div
                        className={`relative text-xl z-10 ${
                          activeBtn === item.active && 'font-semibold'
                        }`}
                      >
                        {item.title}
                      </div>
                    </button>
                  </>
                ))}
              </div>
            </div>
            {activeBtn === 1 && (
              <>
                <div className="">
                  <div>
                    <p className="text-base text-[#292929] my-4">
                      {content.content}
                    </p>
                    <p className="my-4">{content.description}</p>
                  </div>
                </div>

                <div className="mt-9">
                  {content?.questions.map((item: any, index: number) => (
                    <>
                      <div
                        className={`mt-4 px-3 py-4 border text-base rounded-lg shadow cursor-pointer ${
                          isSelect[index] === true
                            ? '!border-[#0093fc]'
                            : 'border-transparent'
                        }`}
                        onClick={() => handleIsSelectAnswer(index)}
                        style={{
                          backgroundColor:
                            typeof isSelect[index] === 'string'
                              ? `${item?.is_Correct ? '#f0ffed' : '#ffeaea'}`
                              : '#f6f7f9',
                          borderColor:
                            typeof isSelect[index] === 'string'
                              ? `${isSelect[index]}`
                              : '#f6f7f9'
                        }}
                      >
                        {item.answer}
                      </div>
                    </>
                  ))}
                  <div
                    className="flex justify-end mt-6"
                    onClick={() => handleAnswer()}
                  >
                    <button
                      className={
                        'min-w-[148px] h-8 text-base font-semibold uppercase bg-[#5ebbff] dark:bg-[#2190ff] rounded-[99px] cursor-pointer '
                      }
                    >
                      <span className="inline-flex items-center justify-center gap-1 w-full h-full py-1 px-4 text-white uppercase">
                        Trả lời
                      </span>
                    </button>
                  </div>
                  {selectedExplanation && (
                    <div className="mt-6">
                      <h2 className="text-lg">Giải thích</h2>
                      <p className="text-base leading-relaxed">
                        {selectedExplanation}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
            {activeBtn === 2 && (
              <CourseComment
                id={id}
                user={user}
                content={content}
                refetch={refetch}
              />
            )}
          </div>
          <p className="text-[#666] text-center text-base py-[30px]">
            Made with{' '}
            <FaHeart
              className="inline-block"
              fill="currentColor"
              color="#d43c68"
            />
            <span className="px-[6px]">.</span>
            Powered by Dev Learning
          </p>
        </div>
      )}
    </>
  );
};

export default CourseContentMedia;
