import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type React from "react";
import { Button } from "./ui/button";

interface courseProps {
  title: string;
  length: number;
  description: string;
  content: string;
  image: string;
}

const Course: React.FC<courseProps> = ({ title , length , description , content , image }) => {

    return (

        <Card>
            <CardHeader className="p-0">
                <CardTitle className="w-full h-70" ><img src={ image } className="w-full h-full m-0 object-cover rounded-xl" alt="This is a course image..." /></CardTitle>
                <CardDescription className="px-4 pt-2">Title: { title }</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Description: { description }</p>
                <p>{ content }</p>
            </CardContent>
            <CardFooter className="flex justify-between pb-4">
                <p className="text-muted-foreground">Duration: { length } h</p>
                <Button variant="outline">Enroll</Button>
            </CardFooter>
        </Card>

    )
}

export default Course;