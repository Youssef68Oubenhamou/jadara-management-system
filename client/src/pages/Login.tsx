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
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"


// Update schema to match the fields being used
const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

type FormValues = z.infer<typeof formSchema>

export function Login() {

    // const [ credent , setCredent ] = useState<>([]);
    const navigate = useNavigate();

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext is null — make sure <AuthProvider> wraps your app.");
    }

    const { setToken , setUserType } = authContext;

    if (localStorage.getItem("token") != null) {

        navigate("/stuCourses");

    }

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted with:", data)
        // Perform login logic here

        fetch("http://localhost:5000/login" , {

            method: "POST",
            headers: {

                "Content-Type": "application/json"

            },
            body: JSON.stringify({ email: data.email , password: data.password })
          
        })
            .then((res) => {

                return res.json();

            })
            .then((credentials) => {

                console.log(credentials.accessToken);

                setToken(credentials.accessToken);
                setUserType(credentials.roleName);
                localStorage.setItem("token" , credentials.accessToken);
                navigate("/stuCourses");

            })
            .catch((err) => {

                console.log(err);
                setToken(null);
                localStorage.removeItem("token");

            })

    }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 w-100">
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
        <Button type="submit">Sign In</Button>
        <p>If you don't have an Account Please <Link to="/register" className="text-blue-600">Sign Up</Link></p>
      </form>
    </Form>
  </>
  )
}

export default Login;
