import Course from "@/components/course";
import { AuthContext } from "@/context/AuthContext";
import { useState , useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export interface dataType {

    title: string;
    course_length: number;
    course_description: string;
    course_content: string;
    course_image: string;

}

const StudentCourses = () => {

    const [ courses , setCourses ] = useState<dataType[]>([]);

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext is null — make sure <AuthProvider> wraps your app.");
    }

    const { token, loading } = authContext;

    useEffect(() => {

        fetch("http://localhost:5000/course/get")
            .then((res) => {

                return res.json();

            })
            .then((data) => {

                setCourses(data);
                console.log(data);

            })
            .catch((err) => {

                console.log(err);

            })

    } , []);

    
    if (loading) {
        return null;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        token && <Carousel className="p-3 justify-self-center h-90 max-w-[35rem] mx-auto mt-[50vh] -translate-y-1/2">
                    <CarouselContent className="-ml-1 gap-4">

                        {

                            courses && courses.map((course , index) => {

                                return <Course key={index} title={course.title} length={course.course_length} description={course.course_description} content={course.course_content} image={course.course_image} />

                            })

                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
    )
}

export default StudentCourses;