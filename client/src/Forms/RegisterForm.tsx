import { useForm } from "react-hook-form";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function RegisterForm() {
    const form = useForm();
    return (
        <div className="">
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Your Username ." {...field} />
                            </FormControl>
                            {/* <FormDescription>Enter Your Username .</FormDescription> */}
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
                                <Input placeholder="Enter Your Email ." {...field} />
                            </FormControl>
                            {/* <FormDescription>Enter Your Email .</FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Form>

        </div>
    )
}

export default RegisterForm;
