import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

type CarouselSizeProps = {
  size?: "sm" | "md" | "lg"
  children: React.ReactNode[]
}

const sizeMap = {
  sm: "w-[300px] h-[400px]",
  md: "w-[500px] h-[600px]",
  lg: "w-[800px] h-[600px]",
}

const VerticalCarousel: React.FC<CarouselSizeProps> = ({
  size = "lg",
  children,
}) => {
  return (
    <div className={`relative mx-auto ${sizeMap[size]}`}>
      <Carousel className="h-full">
        <CarouselContent className="flex flex-col h-full  space-y-4">
          {children.map((child, index) => (
            <CarouselItem
              key={index}
              className="flex-none h-auto flex items-center justify-center"
            >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
          <CarouselPrevious className="rotate-[-90deg]" />
        </div>
              {child}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
          <CarouselNext className="rotate-[-90deg] "/>
        </div>
            </CarouselItem>
          ))}
        </CarouselContent>

      </Carousel>
    </div>
  )
}

export default VerticalCarousel
