import React,{FC} from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle"
import toast from 'react-hot-toast';
import {styles} from '../../Styles/style';

type Props = {
    benefits:{title:string}[];
    setBenefits:(benefits:{title:string}[])=>void;
    prerequisites:{title:string}[];
    setPrerequisites:(prerequisites:{title:string}[])=>void;
    active:number;
    setActive:(active:number)=>void;
} 

const CourseData:FC<Props> = ({
    benefits,
    setBenefits,
    prerequisites,
    setPrerequisites,
    active,
    setActive
}) => {
    const handleBenefitChange=(index: number, value: any) => {
        
        const updatedBenefits = [...benefits]; // Create a copy of the benefits array
        updatedBenefits[index].title = value; // Update the title property of the specific object
        
        setBenefits(updatedBenefits);
    }
    const handleAddBenefit=()=>{
        setBenefits([...benefits,{title:""}])
    }
    const handlePrerequisitesChange=(index:number,value:any)=>{
         const updatedPrerequisites = [...prerequisites];   
        // Create a copy of the prerequisites array
        updatedPrerequisites[index].title = value; // Update the title property of the specific object
        setPrerequisites(updatedPrerequisites);
    }
    const handleAddPrerequisites=()=>{
        setPrerequisites([...prerequisites,{title:""}])
    }
    const prevButton=()=>{
        setActive(active-1);
    }
    const handleOptions = () => {
        if (
            benefits.length > 0 &&
            benefits.every((benefit) => benefit.title !== "") &&
            prerequisites.length > 0 &&
            prerequisites.every((prerequisite) => prerequisite.title !== "")
        ) {
            setActive(active + 1);
        } else {
            toast.error("Vui lòng điền vào các trường để chuyển sang bước tiếp theo");
        }
    };    
  return (
    <div className='w-[80%] m-auto mt-24 block'>
        <div className='bg-white dark:bg-[#121212] rounded-lg p-8'>
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    Lợi ích của học viên khi tham gia khóa học này là gì?
                </label>
                    {
                        benefits.map((benefit:any,index:number)=>(
                            <div
                                key={index}
                                className='relative flex justify-center border border-[#dee3e9] rounded items-center my-2'
                            >
                                <input 
                                    type="text"        
                                    name="Benefit"
                                    placeholder="Nhập những lợi ích khi tham gia khóa học này..."
                                    value={benefit?.title}
                                    className={`${styles.input}`}
                                    onChange={(e)=>handleBenefitChange(index,e.target.value)}
                                />
                            </div>
                        ))
                    }
                <AddCircleIcon 
                    onClick={handleAddBenefit}
                    className='text-black dark:text-white cursor-pointer w-[30px] my-[10px]'
                />
            </div>
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    Điều kiện tiên quyết để bắt đầu khóa học này là gì?
                </label>
                    {
                        prerequisites.map((prerequisites:any,index:number)=>(
                            <div
                                key={index}
                                className='relative flex justify-center border border-[#dee3e9] rounded items-center my-2'
                            >
                                <input 
                                    type="text"
                                    name="prerequisites"
                                    placeholder="Nhập những điều kiện để học khóa học"
                                    className={`${styles.input}`}
                                    value={prerequisites.title}
                                    onChange={(e)=>handlePrerequisitesChange(index,e.target.value)}
                                />
                            </div>
                        ))
                    }
                <AddCircleIcon 
                    onClick={handleAddPrerequisites}
                    className='text-black dark:text-white cursor-pointer w-[30px] my-[10px]'
                />
            </div>
        </div>
        <div className='w-full flex items-center justify-between'>
            <div 
                className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#2190ff] text-center text-[#fff] rounded mt-8 over:cursor-pointer'
                onClick={()=>prevButton()}
            >
                Quay lại
            </div>
            <div 
                className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#2190ff] text-center text-[#fff] rounded mt-8 hover:cursor-pointer'
                onClick={()=>handleOptions()}
            >
                Tiếp tục
            </div>

        </div>
    </div>
  )
}

export default CourseData