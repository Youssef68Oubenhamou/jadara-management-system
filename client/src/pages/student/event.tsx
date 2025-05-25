
import { Carousel, CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";


export default function EventCarousel() {


  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">📅 Upcoming Events</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {events.map((event, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-full flex flex-col">
                {loading ? (
                  <div className="w-full h-40 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <p>Loading...</p>
                  </div>
                ) : (
                  <img
                    src={images[index] || sustainable}
                    alt={event.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                )}
                <CardContent className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-green-900">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {event.date} at {event.time}
                  </p>
                  <p className="mt-2 text-sm text-gray-700">{event.description}</p>
                  <p className="mt-auto text-xs text-gray-500">{event.location}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex justify-between mt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  )
}