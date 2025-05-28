"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Input } from "@/components/ui/input"
import { useState } from "react"

// Update schema to match the fields being used
const formSchema = z.object({
    username: z.string().min(4 , { message: "Username must be at least 4 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    group: z.string().max(1, { message: "Group must be at least 1 number" })
})

type FormValues = z.infer<typeof formSchema>

function Register() {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            group: ""
        },
    })

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted with:", data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 w-100">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormDescription>This is your username.</FormDescription>
                            <FormMessage />
                        </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormDescription>This is your email.</FormDescription>
                            <FormMessage />
                        </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="password" {...field} />
                            </FormControl>
                            <FormDescription>This is your password.</FormDescription>
                            <FormMessage />
                        </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="group"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Group</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="group" {...field} />
                            </FormControl>
                            <FormDescription>This is your group.</FormDescription>
                            <FormMessage />
                        </FormItem>
                  )}
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </Form>
    )
}

export default Register;