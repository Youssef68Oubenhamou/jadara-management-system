import Course from "@/components/course";
import { AuthContext } from "@/context/AuthContext";
import { useState , useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

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
      token && <div className="flex justify-around flex-wrap">

          {

              courses && courses.map((course) => {

                  return <Course title={course.title} length={course.course_length} description={course.course_description} content={course.course_content} image={course.course_image} />

              })

          }

      </div>
    )
}

export default StudentCourses;