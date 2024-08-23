import React from 'react'
import {styles} from '../components/Styles/style'

type Props = {}

const Policy = (props: Props) => {
  return (
    <div className='text-black dark:text-white'>
        <br/>
        <h1 className={`${styles.title} 800px:!text-[45px]`}>
            Chính sách bảo mật của <span className='text-gradient'>Dev Learning</span>
        </h1>
        <br/>
        <div className='w-[95%] 800px:w-[85%] m-auto'>
            <h2 className='text-[22px] font-semibold'>Bạn có biết</h2>      
            <p className='text-[18px]'>
                Một trong những ưu tiên chính của chúng tôi tại trang web Becodemy (becodemy.com) là quyền riêng tư thông tin của người dùng. Tài liệu này chứa thông tin chi tiết về những thông tin chúng tôi thu thập từ trang web Becodemy và cách chúng tôi sử dụng thông tin đó.
                <br/>
                <br/>
                Nếu bạn có bất kỳ câu hỏi nào hoặc cần thêm thông tin về chính sách bảo mật của chúng tôi, vui lòng liên hệ với chúng tôi.
                <br/>
                <br/>
                This Privacy Policy applies only to our online activities and is valid for information shared by our website visitors and/or collected from the Becodemy website. This policy does not apply to any information collected offline or through channels other than this website.
            </p>
            <br/>
            <ul className='list-disc ml-4'>
                <li className='text-cyan-400 text-xl font-semibold'>Chúng ta đã thu thập được thông tin gì?</li>     
                <br />
                <p className='py-2 ml-[-15px] text-[16px] font-Poppins leading-8 pb-10 whitespace-pre-line'>
                      Khi chúng tôi yêu cầu bạn cung cấp thông tin cá nhân của mình trên Trang web, bạn sẽ được giải thích rõ lý do tại sao bạn được yêu cầu cung cấp thông tin đó.
                      <p className="py-2 text-[16px] font-Poppins leading-8 whitespace-pre-line">
                          Nếu bạn liên hệ trực tiếp với chúng tôi, chúng tôi có thể thu thập thông tin bổ sung về bạn như tên, địa chỉ email, số điện thoại, nội dung liên lạc và/hoặc bất kỳ tệp đính kèm hoặc thông tin nào khác mà bạn gửi cho chúng tôi.
                      </p>
                      <p className="py-2 text-[16px] font-Poppins leading-8 whitespace-pre-line">
                          Khi đăng ký tài khoản trên trang web của chúng tôi, bạn được yêu cầu cung cấp một số thông tin cá nhân như tên, địa chỉ email, ảnh, số điện thoại di động, tên người dùng Discord, địa chỉ, v.v. Ngoài ra, sau đó chúng tôi có thể yêu cầu thông tin bổ sung về- cơ sở cần thiết với sự cho phép của bạn. Chúng tôi không chia sẻ thông tin của bạn với bất kỳ ai mà không có sự cho phép của bạn và duy trì tính bảo mật của thông tin.
                      </p>
                </p>
              </ul>
              <ul className='list-disc ml-4'>
                <li className='text-cyan-400 text-xl font-semibold'>Nguyên tắc chung</li>     
                <br />
                <p className='py-2 ml-[-15px] text-[16px] font-Poppins leading-8 pb-10 whitespace-pre-line'>
                      Website http://localhost:3000/ do Công ty Cổ phần Công Nghệ Giáo Dục Dev Learning sở hữu và vận hành. Đối tượng hoạt động trên website này bao gồm: Đối tác và người học có đăng ký sử dụng tài khoản được ban quản trị Dev Learning phê duyệt.
                      <p className="py-2 text-[16px] font-Poppins leading-8 whitespace-pre-line">
                          Hoạt dộng giao dịch mua khóa học trên Dev Learning được thực hiện dựa trên nguyên tắc tự do, tự nguyện, bình đẳng, tôn trọng quyền và lợi ích hợp pháp của các bên tham gia, không vi phạm với qui định của Pháp luật và qui định của Dev Learning 
                      </p>
                      <p className="py-2 text-[16px] font-Poppins leading-8 whitespace-pre-line">
                          Mọi sản phẩm hàng hóa/dịch vụ giao dịch trên website đáp ứng đầy đủ các điều kiện theo quy định của Dev Learning và theo quy định có liên quan của pháp luật, không thuộc trường hợp các mặt hang cấm giao dịch, hàng lậu, hàng giả.
                      </p>
                      <p className="py-2 text-[16px] font-Poppins leading-8 whitespace-pre-line">
                          Đối tác và người học đăng ký tài khoản và sử dụng dịch vụ trên website của Dev Learning đã đồng ý với các đièu khoản hoạt động, chịu trách nhiệm pháp lý với hành vi của mình và cam kết thực hiện mọi quy định liên quan
                      </p>
                      <p className="py-2 text-[16px] font-Poppins leading-8 whitespace-pre-line">
                          Dev Learning cam kết xây dựng quy chế dựa trên các quy định về thương mại điện tử và tuân theo các quy định của pháp luật Việt Nam
                      </p>
                </p>
            </ul>
        </div>
    </div>
  )
}

export default Policy