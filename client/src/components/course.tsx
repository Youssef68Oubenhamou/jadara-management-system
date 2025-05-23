import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type React from "react";

interface courseProps {
  title: string;
  length: number;
  description: string;
  content: string;
  image: string;
}

const Course: React.FC<courseProps> = ({ title , length , description , content , image }) => {
    return (

        <Card className="w-70 h-60">
            <CardHeader>
                <CardTitle>{ image }</CardTitle>
                <CardDescription>{ title }</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{ description }</p>
                <p>{ content }</p>
            </CardContent>
            <CardFooter>
                <p>{ length }</p>
            </CardFooter>
        </Card>

    )
}

export default Course;