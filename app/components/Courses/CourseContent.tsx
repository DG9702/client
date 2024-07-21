import React, { FC, useState } from 'react';
import Header from '../Header/Header';
import Heading from '@/app/utils/Heading';
import Loader from '../Loader/Loader';
import {useGetCourseContentQuery} from '@/redux/features/courses/coursesApi';
import CourseContentMedia from './CourseContentMedia';

type Props = {
    id: string;
    user: any;
};

const CourseContent: FC<Props> = ({ id, user }) => {
    const {
        data: contentData,
        isLoading,
        refetch
    } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true });
    const dataContent = contentData?.content;
    const [activeVideo, setActiveVideo] = useState(0);
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState('Login');

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Header
                        activeItem={1}
                        open={open}
                        setOpen={setOpen}
                        route={route}
                        setRoute={setRoute}
                    />
                    <div className="w-full grid 800px:grid-cols-10">
                        <Heading
                            title={dataContent[activeVideo]?.title}
                            description="anything"
                            keywords={dataContent[activeVideo]?.tags}
                        />
                        <div className="col-span-7">
                            <CourseContentMedia
                                data={dataContent}
                                id={id}
                                activeVideo={activeVideo}
                                setActiveVideo={setActiveVideo}
                                user={user}
                                refetch={refetch}
                            />
                        </div>
                        <div className="hidden 800px:block 800px:col-span-3">
                            {/*<CourseContentList
                                setActiveVideo={setActiveVideo}
                                data={data}
                                activeVideo={activeVideo}
                            />*/}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default CourseContent;
