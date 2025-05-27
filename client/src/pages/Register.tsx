import{ useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2'
 

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState("");

  const handleRegister = (e: { preventDefault: () => void; }) => {

      e.preventDefault();

      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username , email , password , group }),
      })
        .then((res) => {

          return res.json();

        })
        .then((data) => {

          console.log(data);

        })
        .catch((err) => {

          console.log(err);

        });
        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success"
        });
  };
       
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-7">
          <div className="grid gap-2 items-start">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="grid gap-2 items-start">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2 items-start">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2 items-start">
            <Label htmlFor="group">Group</Label>
            <Input
              id="group"
              type="text"
              placeholder="1....."
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleRegister} >
          
          Create Account
          
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Register;
