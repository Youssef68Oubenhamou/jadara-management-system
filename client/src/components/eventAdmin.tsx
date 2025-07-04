// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
// } from "@/components/ui/carousel"

// import EventCardAdmin from "./EventCardAdmin" 

// type Event = {
//   id: number
//   title: string
//   description: string
//   date: string
//   image: string
// }

// type Props = {
//   events: Event[]
//   orientation?: "horizontal" | "vertical"
// }

// const EventAdmin = ({ events, orientation = "horizontal" }: Props) =>{
//   return (
//     <div className="w-full max-w-4xl mx-auto">
//       <Carousel orientation={orientation}>
//         <CarouselContent>
//           {events.map((event,index) => (
//             <CarouselItem key={event.id} className="p-4">
//               <EventCardAdmin
//                 key={index}
//                 title={event.title}
//                 description={event.description}
//                 date={event.date}
//                 image={event.image}
//               />
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselNext />
//       </Carousel>
//     </div>
//   )
// }

// export default EventAdmin



// components/EventAdmin.tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel"
import EventCardAdmin from "./EventCardAdmin"

type Event = {
  _id: string
  title_event: string
  description_event: string
  date_event: string
  location_event: string
  image: string
}

type Props = {
  events: Event[]
  orientation?: "horizontal" | "vertical"
}

const EventAdmin = ({ events, orientation = "vertical" }: Props) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel orientation={orientation}>
        <CarouselContent>
          {events.map((event,index) => (
              <CarouselItem key={event._id} className="p-4">
                <EventCardAdmin
                  key={index}
                  title={event.title_event}
                  description={event.description_event}
                  date={event.date_event}
                  location={event.location_event}
                  image={event.image}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default EventAdmin

