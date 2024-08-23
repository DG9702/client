import React from 'react'
import {styles} from '../components/Styles/style'

type Props = {}

const About = (props: Props) => {
  return (
    <div className='text-black dark:text-white'>
        <br/>
        <h1 className={`${styles.title} 800px:!text-[45px]`}>
            Giới thiệu về <span className='text-gradient'>Dev Learning</span>
        </h1>
        <br/>
        <div className='w-[95%] 800px:w-[85%] m-auto'>
            <h2 className='text-[22px]'>Bạn có biết</h2>      
            <p className='text-[18px]'>
                Ngoài kia có rất nhiều bạn làm sai nghề, tư duy an phận và bị chôn chân với một công việc không đủ vui, không đủ sống, các bạn ấy gặp hết khủng hoảng tuổi này tới tuổi kia.
                <br/>
                <br/>
                Tuổi 22 đang ngỡ ngàng không biết mình nên làm nghề gì. Tuổi 28 thì bàng hoàng không biết lương như mình thì lập gia đình và nuôi dạy con cái làm sao. Tuổi 40 nuối tiếc thanh xuân của mình liệu có phải đã phí hoài không nhỉ...
                <br/>
                <br/>
                Mọi chuyện sẽ rất khác nếu họ được định hướng công việc phù hợp, biết cách đặt cho mình một mục tiêu rõ ràng và có đầy đủ kĩ năng cần thiết để phát triển sự nghiệp.
                <br/>
                Dev Learning tin rằng con người Việt Nam không hề thua kém gì so với con người ở bất cứ nơi đâu. Con rồng cháu tiên hoàn toàn có thể trở thành công dân toàn cầu để sánh vai cùng các cường quốc năm châu.
                <br/>
                Dev Learning mong muốn trở thành một tổ chức góp phần tạo nên sự thay đổi đó, và việc tạo ra cộng đồng học lập trình mới chỉ là điểm bắt đầu. Chúng tôi đang nỗ lực tạo ra các khóa học có nội dung chất lượng vượt trội, giúp học viên sau khi hoàn thành khóa học có thể trở thành những lập trình viên luôn được nhiều công ty săn đón.
            </p>
            <br/>

        </div>
    </div>
  )
}

export default About