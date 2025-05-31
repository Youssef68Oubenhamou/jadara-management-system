import { useState , useEffect } from "react";
import type {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
 
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

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

    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is null — make sure <AuthProvider> wraps your app.");
    }
    const { token , loading } = authContext;

    const [ title , setTitle ] = useState<string>("");
    const [ courseLength , setCourseLength ] = useState<number>();
    const [ courseDescription , setCourseDescription ] = useState<string>("");
    const [ courseContent , setCourseContent ] = useState<string>("");
    const [ courseImage , setCourseImage ] = useState<string>("");

    const [ courseData , setCourseData ] = useState<Course>(Object);

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

    const handleUpdate = async (id: string) => {

        setCourseData(Object({

            title: title,
            course_length: courseLength,
            course_description: courseDescription,
            course_content: courseContent,
            course_image: courseImage

        }));

        fetch(`http://localhost:5000/course/update/${id}` , {

            method: "PUT",
            headers: {
                
                "Content-Type": "application/json"

            },
            body: JSON.stringify(courseData)

        })
            .then((response) => { 
                return response.json();
            })
            .then((data) => {

                console.log(data);

            })
            .catch((err) => {

                console.log(`An error occured when trying to update the user : ${err}`);

            })

    }

    if (loading) {
        return null;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            
            <Table>
                <TableCaption>A list of recent Courses.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Course_Length</TableHead>
                    <TableHead className="text-right">Course_Description</TableHead>
                    <TableHead className="text-right">Course_Content</TableHead>
                    <TableHead className="text-right">Course_Image</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
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
                        <TableCell className="text-right">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button className="bg-green-500">Update</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-150">
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <h4 className="font-medium leading-none">Course {course._id}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Set the Course Informations :
                                            </p>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="width">Title</Label>
                                            <Input
                                                id="width"
                                                defaultValue={course.title}
                                                className="col-span-2 h-8"
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                            </div>
                                            <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="maxWidth">Course_Length</Label>
                                            <Input
                                                id="maxWidth"
                                                defaultValue={course.course_length}
                                                className="col-span-2 h-8"
                                                type="number"
                                                value={courseLength}
                                                onChange={(e) => setCourseLength(parseInt(e.target.value))}
                                            />
                                            </div>
                                            <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="height">Course_Description</Label>
                                            <Input
                                                id="height"
                                                defaultValue={course.course_description}
                                                className="col-span-2 h-8"
                                                type="text"
                                                value={courseDescription}
                                                onChange={(e) => setCourseDescription(e.target.value)}
                                            />
                                            </div>
                                            <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="maxHeight">Course_Content</Label>
                                            <Input
                                                id="maxHeight"
                                                defaultValue={course.course_content}
                                                className="col-span-2 h-8"
                                                type="text"
                                                value={courseContent}
                                                onChange={(e) => setCourseContent(e.target.value)}
                                            />
                                            </div>
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="picture">Course_Image</Label>
                                                <Input id="picture" type="file" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Button onClick={() => handleUpdate(course._id)}>update</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                        <TableCell className="text-right"><Button className="bg-red-500">Delete</Button></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
        </div>
    )
}

export default AdminCourses;
