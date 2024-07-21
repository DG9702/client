import React, {FC} from 'react'


type Props = {
    data:any;
    id:string;
    activeVideo:number;
    setActiveVideo:(activeVideo:number)=>void;
    user:any;
    refetch:any;
}
const CourseContentMedia: FC<Props> = ({ refetch,data,id,activeVideo,setActiveVideo,user }) => {
  return (
    <div>CourseContentMedia</div>
  )
}

export default CourseContentMedia