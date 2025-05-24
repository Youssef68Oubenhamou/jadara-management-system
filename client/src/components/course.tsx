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
import { useState } from "react";

interface courseProps {
  title: string;
  length: number;
  description: string;
  content: string;
  image: string;
}

const Course: React.FC<courseProps> = ({ title , length , description , content , image }) => {

    return (

        <Card className="h-60">
            <CardHeader>
                <CardTitle>{ image }</CardTitle>
                <CardDescription>Title: { title }</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Description: { description }</p>
                <p>{ content }</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <p className="text-muted-foreground">Duration: { length } h</p>
                <Button variant="outline" onClick={() => setEnroll(true)}>Enroll</Button>
            </CardFooter>
        </Card>

    )
}

export default Course;