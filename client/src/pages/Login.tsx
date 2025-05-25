import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const Login = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        
        
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-7">
          <div className="grid gap-2 items-start space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2 items-start space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Login</Button>
      </CardFooter>
      <div className="mt-4 text-center">
        <Link to="/register" className="text-blue-600 hover:underline">
          Don't have an account? Sign up
        </Link>
      </div>
    </Card>
  );
};

export default Login;
