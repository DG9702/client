/* eslint-disable @next/next/no-img-element */
import React, { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Loader from '../Loader/Loader';
import {useRouter} from 'next/navigation';

type Props = {};

const Hero: FC<Props> = (Props) => {
    const { data, refetch, isLoading } = useGetHeroDataQuery('Banner', {});
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (search === "") {
            return;
        } else {
            router.push(`/courses?title=${search}`);
        }
    };    

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="1000px:flex items-center w-[95%] 800px:w-[92%] m-auto">
                    <div className="1000px:w-[40%] flex 1000px:min-h-[80vh] items-center 1000px:justify-end justify-center pt-[70px] 1000px:pt-[0]">
                        <img
                            src={data?.layout?.banner?.image?.url}
                            width="400px"
                            height="400px"
                            alt=""
                            className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] 800px:max-w-[70%] 1000px:pt-[0] 1000px:ml-[0] 800px:pt-[70px] 800px:ml-[60px] h-[auto]"
                        />
                    </div>
                    <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
                        <h2 className="dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1100px:w-[78%] outline-none bg-transparent block">
                            {data?.layout?.banner?.title}
                        </h2>
                        <br />
                        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] px-3 1100px:!w-[78%]">
                            {data?.layout?.banner?.subTitle}
                        </p>
                        <br />
                        <br />
                        <div className="1100px:w-[78%] w-[90%] h-[50px] bg-transparent">
                            <div className="relative h-full w-[60%]">
                                <input
                                    type="search"
                                    placeholder="Tìm kiếm khóa học...."
                                    value={search}
                                    onChange={(e)=>setSearch(e.target.value)}
                                    className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-black dark:text-white text-[20px] font-[500] font-Josefin"
                                />
                                <div
                                    className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
                                    onClick={handleSearch}
                                >
                                    <BiSearch className="text-white" size={30} />
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            )}
        </>
    );
};

export default Hero;
