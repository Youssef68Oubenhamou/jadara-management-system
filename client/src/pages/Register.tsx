"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Card , CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react";

// Update schema to match the fields being used
const formSchema = z.object({
    username: z.string().min(4 , { message: "Username must be at least 4 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    group: z.coerce.number().min(1, {message: "Group is required"})
})

type FormValues = z.infer<typeof formSchema>

function Register() {

    const navigate = useNavigate();

    if (localStorage.getItem("token") != null) {

        navigate("/stuCourses");

    }

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            group: 0
        },
    })

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted with:", data);

        fetch("http://localhost:5000/register" , {

            method: "POST",
            headers: {

                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                username: data.username ,
                email: data.email ,
                password: data.password ,
                group: data.group
            })

        })
            .then((res) => {

                if (res.status == 403) {

                    toast.error("This User is already exist , Sorry try again !");

                }

                return res.json();

            })
            .then((data) => {

                console.log(data);
                if (data && data.message != "Email already exist !") {

                    toast.success("Your account has been created successfuly !");
                    navigate("/login");

                } else {

                    navigate("/register");

                }
                
            })
            .catch((err) => {

                console.log(err);

            })

    }

    return (
        <div className="flex items-center justify-center min-h-[100vh]" >
            <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4"
            >
                <ArrowLeft className="w-5 h-5" />
            </Button>

            <ToastContainer />

            <Card className="w-full sm:max-w-md p-5">
                <CardHeader className="flex flex-col items-center text-center">
                    <img
                        src="/logo-jadara.png"
                        alt="Logo"
                        className="w-20 h-8 object-contain"
                    />
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 w-100">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field , fieldState }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username" {...field} />
                                    </FormControl>
                                    {fieldState.error ? (
                                        <FormMessage/>
                                    ) : (
                                        <FormDescription>This is your username.</FormDescription>
                                    ) }
                                </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field , fieldState }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    {fieldState.error ? (
                                        <FormMessage/>
                                    ) : (
                                        <FormDescription>This is your email.</FormDescription>
                                    ) }
                                </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field , fieldState }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="password" {...field} />
                                    </FormControl>
                                    {fieldState.error ? (
                                        <FormMessage/>
                                    ) : (
                                        <FormDescription>This is your password.</FormDescription>
                                    ) }
                                </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="group"
                            render={({ field , fieldState }) => (
                                <FormItem>
                                    <FormLabel>Group</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="group" {...field} />
                                    </FormControl>
                                    {fieldState.error ? (
                                        <FormMessage/>
                                    ) : (
                                        <FormDescription>This is your group.</FormDescription>
                                    ) }
                                </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-100">Sign Up</Button>
                        <p className="flex justify-center gap-1">If you already have an Account <Link to="/login" className="text-blue-600">Sign In</Link></p>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default Register;