import { useState , useEffect } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
 
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type Course = {
    _id: string;
    title: string;
    course_length: number;
    course_description: string;
    course_content: string;
    course_image: string;
}

const AdminCourses = () => {

    const [ courses , setCourses ] = useState<Course[]>([]);

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
        <div>
            
            {

                courses && courses.map((course) => {

                    return <></>

                })

            }

        </div>
    )
}

export default AdminCourses;
