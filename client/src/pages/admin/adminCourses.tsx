import { useState , useEffect } from "react";
import type {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
 
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
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
            
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Course_Length</TableHead>
                    <TableHead className="text-right">Course_Description</TableHead>
                    <TableHead className="text-right">Course_Content</TableHead>
                    <TableHead className="text-right">Course_Image</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses.map((course) => (
                    <TableRow key={course._id}>
                        <TableCell className="font-medium">{course._id}</TableCell>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.course_length}</TableCell>
                        <TableCell>{course.course_description}</TableCell>
                        <TableCell className="text-right">{course.course_content}</TableCell>
                        <TableCell className="text-right">{course.course_image}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
                </Table>
        </div>
    )
}

export default AdminCourses;
