"use client"
import { useState , useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

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
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

type Course = {
    _id: string;
    title: string;
    course_length: number;
    course_description: string;
    course_content: string;
    course_image: string;
}

const formSchema = z.object({
    title: z.string().min(3 , { message: "Title must be at least 3 characters." }),
    course_length: z.number({ message: "Invalid length , length should be number." }),
    course_description: z.string({ message: "Description must be string not number." }),
    course_content: z.string().max(1, { message: "Group must be at least 1 number" }),
    course_image: z.string().max(1, { message: "Group must be at least 1 number" })
})

type FormValues = z.infer<typeof formSchema>

const AdminCourses = () => {

    const [ courses , setCourses ] = useState<Course[]>([]);

    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is null — make sure <AuthProvider> wraps your app.");
    }
    const { token , loading } = authContext;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            course_length: 0,
            course_description: "",
            course_content: "",
            course_image: "",
        },
    })

    // const [ title , setTitle ] = useState<string>("");
    // const [ courseLength , setCourseLength ] = useState<number>();
    // const [ courseDescription , setCourseDescription ] = useState<string>("");
    // const [ courseContent , setCourseContent ] = useState<string>("");
    // const [ courseImage , setCourseImage ] = useState<string>("");

    // const [ courseData , setCourseData ] = useState<Course>(Object);

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

    const handleUpdate = async (id: string , values: FormValues) => {

        // setCourseData(Object({

        //     title: title,
        //     course_length: courseLength,
        //     course_description: courseDescription,
        //     course_content: courseContent,
        //     course_image: courseImage

        // }));

        fetch(`http://localhost:5000/course/update/${id}` , {

            method: "PUT",
            headers: {
                
                "Content-Type": "application/json"

            },
            body: JSON.stringify(values)

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
                                <PopoverContent className="w-110">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(() => handleUpdate(course._id))} className="space-y-5 w-100">
                                            <Button type="submit">update course</Button>
                                            <FormField
                                                control={form.control}
                                                name="title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Title</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="title" {...field} />
                                                        </FormControl>
                                                        <FormDescription>This is course title.</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                            )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="course_length"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Length</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" placeholder="length" {...field} />
                                                        </FormControl>
                                                        <FormDescription>This is course length.</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                            )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="course_description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Description</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder="description" {...field} />
                                                        </FormControl>
                                                        <FormDescription>This is course description.</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                            )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="course_content"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Content</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder="content" {...field} />
                                                        </FormControl>
                                                        <FormDescription>This is course content.</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                            )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="course_image"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Image</FormLabel>
                                                        <FormControl>
                                                            <Input type="file" placeholder="select image" {...field} />
                                                        </FormControl>
                                                        <FormDescription>This is course image.</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                            )}
                                            />
                                        </form>
                                    </Form>
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
