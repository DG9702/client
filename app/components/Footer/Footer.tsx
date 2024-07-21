import React from 'react'
import Link from "next/link"

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer>
        <div className='border border-[#0000000e] dark:border-[#ffffff1e]'/>
        <br/>
        <div className='w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8 mb-5'>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4'>
                <div className='space-y-3'>
                    <h3 className='text-[20px] font-[600] text-black dark:text-white'>Về Dev Learning</h3>
                    <ul className='space-y-4'>
                        <li>
                            <Link href="/about" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                Giới thiệu
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy-policy" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                Điều khoản
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy-policy" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                Chính sách bảo mật
                            </Link>
                        </li>
                        <li>
                            <Link href="/faq" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                Câu hỏi thường gặp
                            </Link>
                        </li>
                    </ul>

                </div>
                <div className='space-y-3'>
                    <h3 className='text-[20px] font-[600] text-black dark:text-white'>Quick Links</h3>
                    <ul className='space-y-4'>
                        <li>
                            <Link href="/courses" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                Khóa học
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                               Tài khoản của tôi
                            </Link>
                        </li>
                        <li>
                            <Link href="/faq" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                Course Dashboard
                            </Link>
                        </li>
                    </ul>

                </div>
                <div className='space-y-3'>
                    <h3 className='text-[20px] font-[600] text-black dark:text-white'>Liên hệ</h3>
                    <ul className='space-y-4'>
                        <li>
                            <Link href="https://www.youtube.com/channel/UCHz65ne9splmvm-q2w1_HWQ" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                Youtube
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.instagram.com/shahriar_sajeeb_" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                Instagram
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.github.com/shahriaresajeeb" className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                                facebook
                            </Link>
                        </li>
                    </ul>

                </div>
                <div>
                    <h3 className='text-[20px] font-[600] text-black dark:text-white pb-3'>Dev Learning - Học lập trình để đi làm</h3>
                    <p className='text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>
                        Điện thoại: 0969.231.629
                    </p>
                    <p className='text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>
                        Email: buihaibq9702@gmail.com
                    </p>
                    <p className='text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>
                        Địa chỉ: 96 Phố Định Công, Phương Liệt, Thanh Xuân, Hà Nội
                    </p>
                </div>

            </div>
              <br />
              <br  />
            <p className='text-center text-black dark:text-white'>
                Copyright 2023 Dev Learning | Nền tảng học lập trình tại Việt Nam
            </p>
        </div>
    </footer>
  )
}

export default Footer