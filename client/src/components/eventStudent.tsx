
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

type CarouselSizeProps = {
  size?: "sm" | "md" | "lg";
  children: React.ReactNode[];
};

const sizeMap = {
  sm: "w-[200px] h-[150px]",
  md: "w-[400px] h-[300px]",
  lg: "w-[600px] h-[400px]",
};

const eventStudent: React.FC<CarouselSizeProps> = ({ size = "md", children }) => {
  return (
    <div className={`mx-auto ${sizeMap[size]} `}>
      <Carousel>
        <CarouselContent>
          {children.map((child , index) => (
            <CarouselItem key={index} className="flex items-center justify-center">
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default eventStudent;



