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
import { Card , CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"
import { ArrowLeft } from "lucide-react";


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

        fetch("http://localhost:5000/login" , {

            method: "POST",
            headers: {

                "Content-Type": "application/json"

            },
            body: JSON.stringify({ email: data.email , password: data.password })
          
        })
            .then((res) => {

              if (res.ok) {

                return res.json();

              }

            })
            .then((credentials) => {

                console.log(credentials.accessToken);

                if (credentials.accessToken) {

                  setToken(credentials.accessToken);
                  setUserType(credentials.roleName);
                  localStorage.setItem("token" , credentials.accessToken);
                  localStorage.setItem("student-group" , credentials.group);
                  localStorage.setItem("user-type" , credentials.roleName);
                  navigate("/stuCourses");

                } else {

                  console.log("The credentials are not correct !");

                }

            })
            .catch((err) => {

                console.log(err);
                setToken(null);
                localStorage.removeItem("token");

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

          <Card className="w-full sm:max-w-md p-5">
              <CardHeader className="flex flex-col items-center text-center">
                  <img
                    src="/logo-jadara.png"
                    alt="Logo"
                    className="w-20 h-8 object-contain"
                  />
              </CardHeader>
              <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 w-100">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field , fieldState }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email" {...field} />
                        </FormControl>
                        {
                            fieldState.error ?
                            (
                                <FormMessage />
                            ) : (
                                <FormDescription>Enter your email.</FormDescription>
                            )
                        }
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
                        {
                            fieldState.error ?
                            (
                                <FormMessage />
                            ) : (
                                <FormDescription>Enter your password.</FormDescription>
                            )
                        }
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-100">Sign In</Button>
                  <p className="flex justify-center gap-1">If you don't have an Account Please <Link to="/register" className="text-blue-600">Sign Up</Link></p>
                </form>
              </Form>
          </Card>
      </div>
  )
}

export default Login;