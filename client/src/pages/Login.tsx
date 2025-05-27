"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
// Correct import: Form, FormControl, etc. are from your UI library, not react-hook-form directly.
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface LoginProps {
  setToken: (token: string) => void;
}

// 1. Update the formSchema to include email and password
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, { // Common practice: password minimum length
    message: "Password must be at least 6 characters.",
  }),
  // If you still want a username field (e.g., for registration, or if login accepts username):
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }).optional(), // Make it optional if not strictly needed for login
});

// Infer the type from the schema for better type safety
type LoginFormValues = z.infer<typeof formSchema>;

const Login = ({ setToken }: LoginProps) => {
  const navigate = useNavigate();

  // 2. Initialize useForm with the schema and resolver
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      // username: "", // Initialize if you keep it in the schema
    },
  });

  // 3. Define the onSubmit function for react-hook-form
  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password }), // Use values from the form
      });

      const data = await response.json();

      if (!response.ok) { // Check for non-2xx responses (e.g., 401, 400)
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      setToken(data.accessToken);
      localStorage.setItem('access-token', data.accessToken); // Consistent with your original code

      if (data.userId) { // Assuming `data.status` indicates successful login for navigation
        navigate('/users');
      } else {
        // Handle cases where status is false but no error was thrown (e.g., backend indicates specific non-error condition)
        console.warn('Login status false, but no error:', data.message);
        alert(data.message || 'Login failed unexpectedly.');
      }

    } catch (error: any) { // Catch network errors or errors thrown from fetch
      console.error('Login error:', error.message);
      alert(error.message); // Display error message to the user
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email" // Changed from username to email
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} type="email" />
              </FormControl>
              <FormDescription>
                Your registered email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password" // Added password field
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormDescription>
                Your account password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* If you wanted a username field for some reason, uncomment and adjust */}
        {/* <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button type="submit">Login</Button> {/* Changed text to Login for clarity */}
      </form>
    </Form>
  );
};

export default Login;