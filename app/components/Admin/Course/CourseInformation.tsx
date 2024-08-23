import React, {FC, useEffect, useState} from 'react'
import {styles} from '../../Styles/style';
import {useGetHeroDataQuery} from '@/redux/features/layout/layoutApi';
import toast from 'react-hot-toast';
type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};


const CourseInformation: FC<Props> = ({ 
    courseInfo,
    setCourseInfo,
    active,
    setActive, 
}) => {
    const [dragging, setDragging]=useState(false);
    
    const { data } = useGetHeroDataQuery("Categories", {});
    const [categories, setCategories]=useState([]);    

    useEffect(() => {
        if (data) {
            setCategories(data.layout.categories);
        }
    }, [data]);

    const handleSubmit=(e: any) => {
            e.preventDefault();
            setActive(active+1);
    }

    const handleFileChange=(e:any)=>{
        const file=e.target.files?.[0];
        if(file){
            const reader=new FileReader();
            reader.onload=(e:any)=>{
                if(reader.readyState===2){
                    setCourseInfo({...courseInfo,thumbnail:reader.result})
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver=(e:any)=>{
        e.preventDefault();
        setDragging(true);
    }
    const handleDragLeave=(e:any)=>{
        e.preventDefault();
        setDragging(false);

    }
    const handleDrop=(e:any)=>{
        e.preventDefault();
        setDragging(false);
        const file=e.dataTransfer.files?.[0];
        if(file){
            const reader=new FileReader();
            reader.onload=()=>{
                setCourseInfo({...courseInfo,thumbnail:reader.result})
            }
            reader.readAsDataURL(file)
        }
    }

  return (
        <div className='w-[80%] m-auto mt-24'>
            <form onSubmit={handleSubmit} className={`${styles.label}`}>
                <div className='bg-white dark:bg-[#121212] rounded-lg p-8'>
                    <div>
                        <label htmlFor="">
                            Tên khóa học
                        </label>
                        <div className='relative flex justify-center border 
                            border-[#dee3e9] rounded items-center my-2'>
                            <input 
                                type="name"
                                name=""
                                required 
                                value={courseInfo.name}
                                onChange={(e:any)=>setCourseInfo({...courseInfo,name:e.target.value})}
                                id="name"
                                placeholder="Nhập tên của khóa học"
                                className={`${styles.input}`}
                            />
                        </div>
    
                    </div>
                    <br/>
                    <div className='mb-5'>
                        <label className={`${styles.label}`}>Mô tả khóa học</label>
                        <div className='relative flex justify-center border border-[#dee3e9] rounded items-center my-2'>
                            <textarea name="" id="" cols={30} rows={8}
                                placeholder='Nhập mô tả khóa học' 
                                className={`${styles.input} !h-min !py-5`} 
                                value={courseInfo.description} 
                                onChange={(e:any)=>setCourseInfo({...courseInfo,description:e.target.value})}
                            >
                            </textarea>
                        </div>
                    </div>  
                    <br/>
                    <div className='w-full flex justify-between'>
                        <div className='w-[45%]'>
                            <label className={`${styles.label}`}>Giá của khóa học</label>
                            <div className='relative flex justify-center border border-[#dee3e9] rounded items-center my-2'>
                                <input
                                    type="number"
                                    name=""
                                    required 
                                    value={courseInfo.price}
                                    onChange={(e:any)=>setCourseInfo({...courseInfo,price:e.target.value})}
                                    id="price"
                                    placeholder="Nhập giá của khóa học"
                                    className={`${styles.input}`}
                                />
                            </div>
                            
    
                        </div>
                        <div className='w-[50%]'>
                            <label className={`${styles.label} w-[50%]`}>Giá ước tính</label>
                            <div className='relative flex justify-center border border-[#dee3e9] rounded items-center my-2'>
                                <input
                                    type="number"
                                    name=""
                                    required 
                                    value={courseInfo.estimatedPrice}
                                    onChange={(e:any)=>setCourseInfo({...courseInfo,estimatedPrice:e.target.value})}
                                    id="estimatedPrice"
                                    placeholder="Nhập giá ước tính của khóa học"
                                    className={`${styles.input}`}
                                />
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className='w-full flex justify-between'>
                        <div className='w-[45%]'>
                            <label className={`${styles.label}`} htmlFor="email">Tags</label>
                            <div className='relative flex justify-center border border-[#dee3e9] rounded items-center my-2'>
                                <input
                                    type="text"
                                    name=""
                                    required 
                                    value={courseInfo.tags}
                                    onChange={(e:any)=>setCourseInfo({...courseInfo,tags:e.target.value})}
                                    id="tags"
                                    placeholder="MERN,Next 13 Socket io, tailwindcss ,LMS"
                                    className={`${styles.input}`}
                                />
                            </div>
                        </div>
    
                        <div className="w-[50%]">
                            <label className={`${styles.label}`}>
                                Thể loại của khóa học
                            </label>
                            <div className='relative flex justify-center border border-[#dee3e9] rounded items-center my-2'>
                                <select
                                    name=""
                                    id=""
                                    className={`${styles.input} hover:cursor-pointer`}
                                    value={courseInfo?.categoryId}
                                    onChange={(e: any) =>
                                        setCourseInfo({ ...courseInfo, categoryId: e.target.value })
                                    }
                                >
                                    <option value="" className="dark:bg-black">Lựa chọn thể loại</option>
                                    {categories &&
                                        categories.map((item: any) => (
                                        <option className="dark:bg-black" value={item?._id} key={item?._id}>
                                            {item.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className='w-full flex justify-between'>
                        <div className='w-[45%]'>
                            <label className={`${styles.label}`}>Cấp độ</label>
                            <div className='relative flex justify-center border border-[#dee3e9] rounded items-center my-2'>
                                <input
                                    type="text"
                                    name=""
                                    required 
                                    value={courseInfo.level}
                                    onChange={(e:any)=>setCourseInfo({...courseInfo,level:e.target.value})}
                                    id="level"
                                    placeholder="Sơ cấp/ Trung cấp/ Chuyên gia"
                                    className={`${styles.input}`}
                                />
                            </div>
                            
    
                        </div>
                        <div className='w-[50%]'>
                            <label className={`${styles.label} w-[50%]`}>Giới thiệu khóa học</label>
                            <div className='relative flex justify-center border border-[#dee3e9] rounded items-center my-2'>
                                <input
                                    type="text"
                                    name=""
                                    required 
                                    value={courseInfo?.demoUrl}
                                    onChange={(e:any)=>setCourseInfo({...courseInfo,demoUrl:e.target.value})}
                                    id="demoUrl"
                                    placeholder="eer74fd"
                                    className={`${styles.input}`}
                                />
                            </div>
                        </div>
    
                    </div>
                    <br/>
                    <div className='w-full relative flex justify-center border border-[#dee3e9] rounded items-center my-2'>
                        <input
                            type="file"
                            accept="image/*"
                            id="file"
                            className='hidden'
                            onChange={handleFileChange}
                        />
                        <label 
                            htmlFor="file" 
                            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" :"bg-transparent"}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {
                                courseInfo.thumbnail ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={courseInfo.thumbnail} alt="" className='max-h-full w-full object-cover'/>
                                ):(
                                    <span className='text-black dark:text-white'>
                                        Kéo và thả hình thu nhỏ của bạn vào đây hoặc nhấp để duyệt
                                    </span>
                                )
                            }
                        </label>
    
                    </div>
                    <br/>
                </div>
                    <div className='w-full flex items-center justify-end'>
                        <input 
                            type="submit"
                            value="Tiếp theo"
                            className='w-full 800px:w-[180px] h-[40px] bg-[#2190ff] text-center text-[#fff] rounded mt-8 cursor-pointer'
                        />
    
                    </div>
                    <br/>
                    <br/>


            </form>
        </div>
  )
}

export default CourseInformation