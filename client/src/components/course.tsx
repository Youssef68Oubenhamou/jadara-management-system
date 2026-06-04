import {
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type React from "react";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge"
import { CarouselItem } from "@/components/ui/carousel"

interface courseProps {
  title: string;
  length: number;
  description: string;
  content: string;
  image: string;
}

const Course: React.FC<courseProps> = ({ title , length , description , content , image }) => {

    return (

        <CarouselItem className="relative w-full max-w-sm overflow-hidden border bg-background p-0 transition hover:shadow-lg">

            <div className="relative">
                <img
                src={image}
                alt="Course cover"
                className="h-40 w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute left-3 top-3 flex gap-2">
                    <Badge variant="secondary">{title}</Badge>
                    <Badge variant="outline" className="text-white border-white/30">
                        Beginner
                    </Badge>
                </div>

                <div className="absolute right-3 top-3">
                    <Badge className="bg-black/60 text-white">{length}h</Badge>
                </div>
            </div>

            <CardHeader className="space-y-2">
                <CardTitle className="text-lg">{title} Basics</CardTitle>

                <CardDescription className="line-clamp-2">
                    {description}
                </CardDescription>

                <div className="text-xs text-muted-foreground flex justify-between">
                <span>{length}h</span>
                <span>Updated recently</span>
                </div>
            </CardHeader>

            <CardFooter className="flex flex-col gap-3">
                <div className="h-1 w-full rounded bg-muted">
                    <div className="h-1 w-2/3 bg-primary rounded" />
                </div>
                <Button className="w-full mb-2">Continue</Button>
            </CardFooter>
        </CarouselItem>

    )
}

export default Course;