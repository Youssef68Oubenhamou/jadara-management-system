import Course from "@/components/course";
import { useState , useEffect } from "react";

export interface dataType {

    title: string;
    course_length: number;
    course_description: string;
    course_content: string;
    course_image: string;

}

const StudentCourses = () => {

    const [ courses , setCourses ] = useState<dataType[]>([]);

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

    return (
      <div className="flex justify-around flex-wrap">

          {

              courses && courses.map((course) => {

                  return <Course title={course.title} length={course.course_length} description={course.course_description} content={course.course_content} image={course.course_image} />

              })

          }

      </div>
    )
}

export default StudentCourses;
