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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "recharts";

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
    course_length: z.coerce.number(),
    course_description: z.string({ message: "Description must be string not number." }),
    course_content: z.string({ message: "Enter a valid content." }),
    course_image: z.string({ message: "Select a proper image." })
})

type FormValues = z.infer<typeof formSchema>

const AdminCourses = () => {

    const [ courses , setCourses ] = useState<Course[]>([]);
    const [ openPop , setOpenPop ] = useState<boolean>(false);

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

    });

    const handleDelete = async (id: string) => {

        fetch(`http://localhost:5000/course/remove/${id}` , {

            method: "DELETE",
            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,

            }

        })
            .then((res) => {

                return res.json();

            })
            .then((infos) => {

                console.log(infos);

            })
            .catch((err) => {

                console.log(err);

            })

    }

    const handleAdd = async (values: FormValues) => {

        const courseRecord = {

            title: values.title ,
            course_length: values.course_length,
            course_description: values.course_description,
            course_content: values.course_content,
            course_image: values.course_image            

        }

        fetch("http://localhost:5000/course/create" , {

            method: "POST",
            headers: {
                
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,

            },
            body: JSON.stringify(courseRecord)

        })
            .then((response) => { 


                console.log(response);
                return response.json();

            })
            .then((data) => {

                console.log(data);

            })
            .catch((err) => {

                console.log(`An error occured when trying to update the user : ${err}`);

            })

            form.reset();

    } 

    const handleUpdate = async (id: string , values: FormValues) => {

        const updatedCourse = {

            _id: id,
            title: values.title ,
            course_length: values.course_length,
            course_description: values.course_description,
            course_content: values.course_content,
            course_image: values.course_image

        };

        fetch(`http://localhost:5000/course/update/${id}` , {

            method: "PUT",
            headers: {
                
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,

            },
            body: JSON.stringify(updatedCourse)

        })
            .then((response) => { 


                console.log(response)
                return response.json();

            })
            .then((data) => {

                console.log(data);

            })
            .catch((err) => {

                console.log(`An error occured when trying to update the user : ${err}`);

            })

            form.reset();

    }

    if (loading) {
        return null;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild><Button variant="outline">+ Add Course</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Create a course :</DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleAdd)} className="space-y-5 w-100">
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
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            form.setValue("course_image", reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}/>
                                            </FormControl>
                                            <FormDescription>This is course image.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                )}
                                />
                                <Button type="submit">Add Course</Button>
                            </form>
                        </Form>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
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
                        <TableCell className="text-right"><img src={course.course_image} alt="Course Image ..." /></TableCell>
                        <TableCell className="text-right">
                            <Dialog>
                                <DialogTrigger asChild><Button className="bg-green-500">Update</Button></DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Update Course : {course._id}</DialogTitle>
                                        <DialogDescription>
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit((values) => handleUpdate(course._id , values))} className="space-y-5 w-100">
                                                    <FormField
                                                        control={form.control}
                                                        name="title"
                                                        defaultValue={course.title}
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
                                                                    <Input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={(e) => {
                                                                        const file = e.target.files?.[0];
                                                                        if (file) {
                                                                            const reader = new FileReader();
                                                                            reader.onloadend = () => {
                                                                                form.setValue("course_image", reader.result as string);
                                                                            };
                                                                            reader.readAsDataURL(file);
                                                                        }
                                                                    }}/>
                                                                </FormControl>
                                                                <FormDescription>This is course image.</FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                    )}
                                                    />
                                                    <Button type="submit" className="bg-green-500" >Update Course</Button>
                                                </form>
                                            </Form>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                        <TableCell className="text-right"><Button className="bg-red-500" onClick={() => handleDelete(course._id)} >Delete</Button></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
        </div>
    )
}

export default AdminCourses;