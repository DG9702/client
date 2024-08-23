import Link from 'next/link';
import React from 'react'

export const navItemsData=[
    {
        name:"Trang chủ",
        url:"/"
    },
    {
        name:"Khóa học",
        url:"/courses"
    },
    {
        name:"Giới thiệu",
        url:"/about"
    },
    {
        name:"Chính sách",
        url:"/policy"
    },
    {
        name:"Câu hỏi thường gặp",
        url:"/faq"
    },
]

type Props={
    activeItem:number;
    isMobile:boolean;

}

const NavItems:React.FC<Props> = ({activeItem,isMobile}) => {
  return (
    <>
        <div className='hidden 1000px:flex'>
            {
                navItemsData && navItemsData.map((i,index)=>(
                    <Link href={`${i.url}`} key={index} passHref>
                        <span className={`${activeItem===index ? "text-[#2190ff]" : "dark:text-white text-black"} text-[18px] px-6 Roboto font-semibold`}>
                            {i.name}
                        </span>
                    </Link>
                ))
            }
        </div>
        {
            isMobile && (
                <div className='1000px:hidden mt-5'>                      
                    <div className='w-full text-center py-6'>
                        <Link href={"/"} passHref>
                            <span className={`text-[25px] Roboto font-semibold text-black dark:text-white`}>
                                Dev Learning
                            </span>
                        </Link>

                    </div>
                    {
                    navItemsData && navItemsData.map((i,index)=>(
                        <Link key={index} href="/" passHref>
                            <span className={`${activeItem===index ? "text-[#2190ff]" : "dark:text-white text-black"} block py-5 text-[18px] px-6 Roboto font-semibold`}>
                                {i.name}
                            </span>
                        </Link> 
                    ))
                    }
                </div>

            )
        }
    </>
  )
}

export default NavItems;