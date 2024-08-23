import React, { FC, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BiSolidPencil } from 'react-icons/bi';
import { IoIosLink } from 'react-icons/io';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { styles } from '../../Styles/style';

type Props = {
  courseContentData: any;
  setCourseContentData: any;
  active: number;
  setActive: (active: number) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit
}) => {
  const [sections, setSections] = useState(courseContentData || []); // State to manage sections
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(
    null
  ); // State to track active section
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null); // State to track active lesson/quiz
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const [typeTrack, setTypeTrack] = useState('');
  const selectTypetrack = [
    {
      title: 'bài giảng'
    },
    {
      title: 'câu hỏi'
    }
  ];

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleAddSection = () => {
    const nextSectionId = sections.length; // Use section index as ID
    const newSection = {
      id: nextSectionId,
      section: `Tiêu đề chương ${nextSectionId + 1}`,
      tracks: []
    };
    setSections([...sections, newSection]);
    setActiveSectionIndex(nextSectionId);
  };
  const handleDeleteSection = (sectionIndex: number) => {
    setSections(
      sections.filter((section: any, index: any) => index !== sectionIndex)
    );
  };

  const [position, setPosition] = useState(1);

  const handleAddTrack = (sectionIndex: number, typeTrack: string) => {
    const updatedSections = [...sections];
    const section = updatedSections[sectionIndex];
    const newTrackId = sectionIndex + '-' + section.tracks.length;
    let newTrack;
    setPosition(position + 1);
    if (!typeTrack) return;

    if (typeTrack === 'bài giảng') {
      newTrack = {
        typeTrack: 'lesson',
        title: '',
        description: '',
        videoUrl: '',
        duration: 0,
        links: [],
        position: position
      };
    } else if (typeTrack === 'câu hỏi') {
      newTrack = {
        typeTrack: 'quiz',
        title: '',
        description: '',
        duration: 0, // Assuming duration is required for quizzes
        content: '', // Assuming content is required for quizzes
        questions: [],
        position: position
      };
    } else {
      // Handle potential invalid typeTrack values (optional)
      console.error('Invalid track type:', typeTrack);
      return;
    }

    section.tracks.push(newTrack);
    setSections(updatedSections);
  };

  const handleDeleteTrack = (sectionIndex: number, trackIndex: number) => {
    const updatedSections = [...sections];
    const section = updatedSections[sectionIndex];
    section.tracks = section.tracks.filter(
      (section: any, i: number) => i !== trackIndex
    );
    setSections(updatedSections);
    setPosition(position - 1);
  };

  const [newLessonLinkTitle, setNewLessonLinkTitle] = useState('');
  const [newLessonLinkUrl, setNewLessonLinkUrl] = useState('');

  const handleAddLink = (index: number, trackIndex: number) => {
    const newLink = {
      title: newLessonLinkTitle,
      url: newLessonLinkUrl
    };

    const updatedSections = [...sections];
    const updatedSection = updatedSections[index];
    updatedSection.tracks[trackIndex].links.push(newLink);
    setSections(updatedSections);

    setNewLessonLinkTitle('');
    setNewLessonLinkUrl('');
  };

  const handleRemoveLink = (trackIndex: number, linkIndex: number) => {
    const updatedSections = [...sections];
    const updatedSection = updatedSections[trackIndex];
    updatedSection.tracks[trackIndex].links.splice(linkIndex, 1);
    setSections(updatedSections);
  };

  const handleAddQuestions = (index: number, trackIndex: number) => {
    const newQuestion = {
      answer: '',
      explanation: '',
      is_Correct: false
    };

    const updatedSections = [...sections];
    const updatedSection = updatedSections[index];
    updatedSection.tracks[trackIndex].questions.push(newQuestion);
    setSections(updatedSections);
  };

  const handleRemoveQuestions = (trackIndex: number, questionIndex: number) => {
    const updatedSections = [...sections];
    const updatedSection = updatedSections[trackIndex];
    updatedSection.tracks[trackIndex].questions.splice(questionIndex, 1);
    setSections(updatedSections);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    setActive(active + 1);
    handleCourseSubmit();
  };

  useEffect(() => {
    setCourseContentData(sections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);  

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {sections.map((section: any, index: any) => {
          const activeSectionIndex =
            index === 0 || section.section !== sections[index - 1].section;
          return (
            <>
              <div
                className={`w-full dark:bg-[#121212] bg-[#00000008] bg-white border dark:border-none shadow-xl rounded-2xl p-8 ${
                  index ? 'mt-10' : 'mb-0'
                }`}
              >
                {activeSectionIndex && (
                  <>
                    <div className="flex justify-between items-center">
                      <div className="flex w-full items-center">
                        <input
                          type="text"
                          className={`text-[20px] ${
                            section.section === 'Tiêu đề chương'
                              ? 'w-[170px]'
                              : 'w-min'
                          } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                          value={section.section}
                          onChange={(e) => {
                            const updatedSections = [...sections];
                            const updatedSection = updatedSections[index];
                            updatedSection.section = e.target.value;
                            setSections(updatedSections);
                          }}
                          defaultValue={`Tiêu đề chương ${index + 1}`}
                        />
                        <BiSolidPencil className="cursor-pointer dark:text-white text-black" />
                      </div>
                      <div className="text-end flex">
                        <AiOutlineDelete
                          className={`${
                            index === 0 ? 'cursor-no-drop' : 'cursor-pointer'
                          } text-black dark:text-white text-[20px]`}
                          onClick={() =>
                            index === 0 ? null : handleDeleteSection(index)
                          }
                        />
                        <MdOutlineKeyboardArrowDown
                          fontSize="large"
                          className="dark:text-white text-black"
                          style={{
                            transform: isCollapsed[index]
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)'
                          }}
                          onClick={() => handleCollapseToggle(index)}
                        />
                      </div>
                    </div>
                    <br />
                  </>
                )}
                {!isCollapsed[index] && (
                  <>
                    {section.tracks.map((track: any, trackIndex: number) => (
                      <div key={trackIndex}>
                        <div className="flex w-full items-center justify-end my-0">
                          {/*arrow button for collapsed video content*/}
                          <div className="flex">
                            <AiOutlineDelete
                              className={`dark:text-white text-[20px] mr-2 text-black ${
                                trackIndex > 0 ? 'cursor-pointer' : 'cursor-no-drop'
                              }`}
                              onClick={() => {
                                if (trackIndex > 0) {
                                  handleDeleteTrack(index, trackIndex);
                                }
                              }}
                            />
                          </div>
                        </div>
                        <div className="mt-4" key={trackIndex}>
                          {track.typeTrack === 'lesson' && (
                            <>
                              <div className="my-3">
                                <label className={styles.label}>
                                  Tiêu đề bài giảng dạng video
                                </label>
                                <div
                                  className="relative flex justify-center border
                                  border-[#dee3e9] rounded items-center my-2"
                                >
                                  <input
                                    type="text"
                                    placeholder="Nhập tiêu đề của bài giảng..."
                                    className={`${styles.input}`}
                                    value={track.title}
                                    onChange={(e) => {
                                      const updatedSections = [...sections];
                                      const updatedSection =
                                        updatedSections[index];
                                      updatedSection.tracks[trackIndex].title =
                                        e.target.value;
                                      setSections(updatedSections);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="my-3">
                                <label className={styles.label}>
                                  Mô tả bài giảng
                                </label>
                                <div
                                  className="relative flex justify-center border
                                  border-[#dee3e9] rounded items-center my-2"
                                >
                                  <textarea
                                    rows={0}
                                    cols={30}
                                    className={`${styles.input} !h-min py-2`}
                                    value={track.description}
                                    onChange={(e) => {
                                      const updatedSections = [...sections];
                                      const updatedSection =
                                        updatedSections[index];
                                      updatedSection.tracks[
                                        trackIndex
                                      ].description = e.target.value;
                                      setSections(updatedSections);
                                    }}
                                    placeholder="Nhập mô tả về bài giảng..."
                                  />
                                </div>
                              </div>
                              <div className="my-3">
                                <label className={styles.label}>
                                  Url bài giảng
                                </label>
                                <div
                                  className="relative flex justify-center border 
                                  border-[#dee3e9] rounded items-center my-2"
                                >
                                  <input
                                    type="text"
                                    placeholder="Nhập id của video bài giảng..."
                                    className={`${styles.input}`}
                                    value={track.videoUrl}
                                    onChange={(e) => {
                                      const updatedSections = [...sections];
                                      const updatedSection =
                                        updatedSections[index];
                                      updatedSection.tracks[
                                        trackIndex
                                      ].videoUrl = e.target.value;
                                      setSections(updatedSections);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="my-3">
                                <label className={styles.label}>
                                  Thời lượng bài học (Tính bằng giây)
                                </label>
                                <div
                                  className="relative flex justify-center border 
                                  border-[#dee3e9] rounded items-center my-2"
                                >
                                  <input
                                    type="number"
                                    placeholder="Nhập thời lượng cho video.."
                                    className={`${styles.input}`}
                                    value={track.duration}
                                    onChange={(e) => {
                                      const updatedSections = [...sections];
                                      const updatedSection =
                                        updatedSections[index];
                                      updatedSection.tracks[
                                        trackIndex
                                      ].duration = parseInt(e.target.value); // Convert to integer
                                      setSections(updatedSections);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="mt-2">
                                {track?.links?.map(
                                  (link: any, linkIndex: number) => (
                                    <div className="mb-3 block" key={linkIndex}>
                                      <div className="w-full flex items-center justify-between">
                                        <label className={styles.label}>
                                          Liên kết {linkIndex + 1}
                                        </label>
                                        <AiOutlineDelete
                                          className={`${
                                            linkIndex === 0
                                              ? 'cursor-no-drop'
                                              : 'cursor-pointer'
                                          } text-black dark:text-white text-[20px]`}
                                          onClick={() =>
                                            linkIndex === 0
                                              ? null
                                              : handleRemoveLink(
                                                  trackIndex,
                                                  linkIndex
                                                )
                                          }
                                        />
                                      </div>
                                      <div
                                        className="relative flex justify-center border 
                                        border-[#dee3e9] rounded items-center my-2"
                                      >
                                        <input
                                          type="text"
                                          placeholder="Tiêu đề tài liệu"
                                          className={`${styles.input}`}
                                          value={link.title}
                                          onChange={(e) => {
                                            const updatedSections = [
                                              ...sections
                                            ];
                                            const updatedSection =
                                              updatedSections[index];
                                            updatedSection.tracks[
                                              trackIndex
                                            ].links[linkIndex].title =
                                              e.target.value;
                                            setSections(updatedSections);
                                          }}
                                        />
                                      </div>
                                      <div
                                        className="relative flex justify-center border 
                                        border-[#dee3e9] rounded items-center my-2"
                                      >
                                        <input
                                          type="url"
                                          placeholder="Đường dẫn tài liệu"
                                          className={`${styles.input}`}
                                          value={link.url}
                                          onChange={(e) => {
                                            const updatedSections = [
                                              ...sections
                                            ];
                                            const updatedSection =
                                              updatedSections[index];
                                            updatedSection.tracks[
                                              trackIndex
                                            ].links[linkIndex].url =
                                              e.target.value;
                                            setSections(updatedSections);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )
                                )}
                                <br />
                                {/*add link button*/}
                                <div className="inline-block mb-4">
                                  <p
                                    onClick={() =>
                                      handleAddLink(index, trackIndex)
                                    }
                                    className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                  >
                                    <IoIosLink className="mr-2" />
                                    Thêm liên kết
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                          {track.typeTrack === 'quiz' && (
                            <>
                              <div className="my-3">
                                <label className={styles.label}>
                                  Tiêu đề câu hỏi
                                </label>
                                <div
                                  className="relative flex justify-center border 
                                  border-[#dee3e9] rounded items-center my-2"
                                >
                                  <input
                                    type="text"
                                    placeholder="Nhập tiêu đề của bài học..."
                                    className={`${styles.input}`}
                                    value={track.title}
                                    onChange={(e) => {
                                      const updatedSections = [...sections];
                                      const updatedSection =
                                        updatedSections[index];
                                      updatedSection.tracks[trackIndex].title =
                                        e.target.value;
                                      setSections(updatedSections);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="my-3">
                                <label className={styles.label}>
                                  Mô tả câu hỏi
                                </label>
                                <div
                                  className="relative flex justify-center border 
                                  border-[#dee3e9] rounded items-center my-2"
                                >
                                  <textarea
                                    rows={0}
                                    cols={30}
                                    className={`${styles.input} !h-min py-2`}
                                    value={track.description}
                                    onChange={(e) => {
                                      const updatedSections = [...sections];
                                      const updatedSection =
                                        updatedSections[index];
                                      updatedSection.tracks[
                                        trackIndex
                                      ].description = e.target.value;
                                      setSections(updatedSections);
                                    }}
                                    placeholder="Nhập mô tả về bài học..."
                                  />
                                </div>
                              </div>
                              <div className="my-3">
                                <label className={styles.label}>
                                  Nội dung câu hỏi
                                </label>
                                <div
                                  className="relative flex justify-center border 
                                  border-[#dee3e9] rounded items-center my-2"
                                >
                                  <input
                                    type="text"
                                    placeholder="Nhập id của video bài học.."
                                    className={`${styles.input}`}
                                    value={track.content}
                                    onChange={(e) => {
                                      const updatedSections = [...sections];
                                      const updatedSection =
                                        updatedSections[index];
                                      updatedSection.tracks[
                                        trackIndex
                                      ].content = e.target.value;
                                      setSections(updatedSections);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="my-3">
                                <label className={styles.label}>
                                  Thời lượng câu hỏi (Tính bằng giây)
                                </label>
                                <div
                                  className="relative flex justify-center border 
                                  border-[#dee3e9] rounded items-center my-2"
                                >
                                  <input
                                    type="number"
                                    placeholder="Nhập thời lượng cho câu hỏi.."
                                    className={`${styles.input}`}
                                    value={track.duration}
                                    onChange={(e) => {
                                      const updatedSections = [...sections];
                                      const updatedSection =
                                        updatedSections[index];
                                      updatedSection.tracks[
                                        trackIndex
                                      ].duration = parseInt(e.target.value); // Convert to integer
                                      setSections(updatedSections);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="mt-2">
                                {track?.questions?.map(
                                  (question: any, questionIndex: number) => (
                                    <div
                                      className="mb-3 block"
                                      key={questionIndex}
                                    >
                                      <div className="w-full flex items-center justify-between">
                                        <label className={styles.label}>
                                          đáp án thứ {questionIndex + 1}
                                        </label>
                                        <AiOutlineDelete
                                          className={`${
                                            questionIndex === 0
                                              ? 'cursor-no-drop'
                                              : 'cursor-pointer'
                                          } text-black dark:text-white text-[20px]`}
                                          onClick={() =>
                                            questionIndex === 0
                                              ? null
                                              : handleRemoveQuestions(
                                                  trackIndex,
                                                  questionIndex
                                                )
                                          }
                                        />
                                      </div>
                                      <div
                                        className="relative flex justify-center bord    
                                        border-[#dee3e9] rounded items-center my-2"
                                      >
                                        <input
                                          type="text"
                                          placeholder="Nhập nội dung câu trả lời..."
                                          className={`${styles.input}`}
                                          value={question.answer}
                                          onChange={(e) => {
                                            const updatedSections = [
                                              ...sections
                                            ];
                                            const updatedSection =
                                              updatedSections[index];
                                            updatedSection.tracks[
                                              trackIndex
                                            ].questions[questionIndex].answer =
                                              e.target.value;
                                            setSections(updatedSections);
                                          }}
                                        />
                                      </div>
                                      <div
                                        className="relative flex justify-center bord    
                                        border-[#dee3e9] rounded items-center my-2"
                                      >
                                        <input
                                          type="text"
                                          placeholder="Nhập nội dung giải thích..."
                                          className={`${styles.input}`}
                                          value={question.explanation}
                                          onChange={(e) => {
                                            const updatedSections = [
                                              ...sections
                                            ];
                                            const updatedSection =
                                              updatedSections[index];
                                            updatedSection.tracks[
                                              trackIndex
                                            ].questions[
                                              questionIndex
                                            ].explanation = e.target.value;
                                            setSections(updatedSections);
                                          }}
                                        />
                                      </div>
                                      <div className="flex items-center ">
                                        <label
                                          className={`${styles.label} mr-2`}
                                        >
                                          Đây là đáp án đúng?
                                        </label>

                                        <input
                                          type="checkbox"
                                          className="w-[16px] text-black dark:text-white bg-transparent h-[16px] outline-none mb-2"
                                          value={question.is_Correct}
                                          onChange={() => {
                                            const updatedSections = [
                                              ...sections
                                            ];
                                            const updatedSection =
                                              updatedSections[index];

                                            // Update is_Correct for all questions to false
                                            if (question.is_Correct === false) {
                                              updatedSection.tracks[
                                                trackIndex
                                              ].questions[
                                                questionIndex
                                              ].is_Correct = true;
                                            }
                                            setSections(updatedSections);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )
                                )}
                                <br />
                                {/*add question button*/}
                                <div className="inline-block mb-4">
                                  <p
                                    onClick={() =>
                                      handleAddQuestions(index, trackIndex)
                                    }
                                    className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                  >
                                    <IoIosLink className="mr-2" />
                                    Thêm đáp án
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {/*add new content*/}
                
                  <div>
                    <div
                      className="w-[200px] relative flex justify-center border   
                      border-[#dee3e9] rounded items-center my-2"
                    >
                      <select
                        name=""
                        id="typeTrack"
                        className={`${styles.input} hover:cursor-pointer`}
                        value={typeTrack}
                        onChange={(e: any) => {
                          setTypeTrack(e.target.value);
                          handleAddTrack(index, e.target.value);
                          setTypeTrack('');
                        }}
                      >
                        <option value="" className="dark:bg-black">
                          Lựa chọn kiểu bài học
                        </option>
                        {selectTypetrack &&
                          selectTypetrack.map((item: any, index: any) => (
                            <option
                              className="dark:bg-black"
                              value={item.title}
                              key={index}
                            >
                              {item.title}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                
              </div>
            </>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={handleAddSection}
        >
          <AiOutlinePlusCircle className="mr-2" />
          Thêm chương mới
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] h-[40px] bg-[#2190ff] flex items-center justify-center text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Quay lại
        </div>
        <div
          className="w-full 800px:w-[180px] h-[40px] bg-[#2190ff] flex items-center justify-center text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Tiếp theo
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
