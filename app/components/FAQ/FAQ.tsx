import { styles } from "../Styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const FAQ = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [question, setQuestion] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestion(data?.layout?.faq);
    }
  }, [data]);

  const toogleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto mb-12">
        <h1 className={`${styles.title} 800px: text-[40px]`}>
          Các câu hỏi thường gặp
        </h1>
        <div className="mt-12">
          <div className="space-y-8">
            {question?.map((q) => (
              <div
                key={q._id}
                className={`${
                  q._id !== question[0]?._id && "border-t"
                } border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start justify-between w-full text-left focus:outline-none"
                    onClick={() => toogleQuestion(q._id)}
                  >
                    <span className="text-2xl font-medium text-black dark:text-white">
                      {q.question}
                    </span>
                    <span className="ml-6 flex-shrink-0">
                      {activeQuestion === q._id ? (
                        <HiMinus className="h-6 w-6 text-black dark:text-white" />
                      ) : (
                        <HiPlus className="h-6 w-6 text-black dark:text-white" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestion === q._id && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base Roboto text-black dark:text-white">
                      {q.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;