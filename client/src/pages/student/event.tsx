
// import EventStudent from "@/components/eventStudent";
// import EventCard from "@/components/EventCard";

// const events = [
//   { title: "javaScript event", image:"/images/JS.png", date: "2025-06-01", description: "y auras une event import la prochaine semaine à partir de 12:00h dans l'école de coding SMTA" },
//   { title: "mongoDB event",image:"/images/mongoDB.jpg", date: "2025-06-10", description: "y auras une event import la prochaine semaine à partir de 12:00h dans l'école de coding SMTA" },
//   { title: "NODE event",image:"/images/NODE.jpg", date: "2025-06-15", description: "third event desxeption" },
//   { title: "React event", image:"/images/React.avif",date: "2025-06-20", description: "fourt event description" },
//   { title: "EVENT 5",image:"/images/mongoDB.jpg", date: "2025-06-25", description: "fifth event description" },
// ];

// export default function Event() {
//   return (
// <div className="max-w-4xl mx-auto p-6 bg-blue-100 rounded-xl shadow-md flex flex-col ">
//   <h1 className="text-2xl font-bold mb-4 text-center">📅 Upcoming events</h1>

//   <EventStudent size="lg">
//     {events.map((event, index) => (
//       <EventCard
//         key={index}
//         title={event.title}
//         date={event.date}
//         description={event.description}
//         image={event.image}
//       />
//     ))}
//   </EventStudent>
// </div>
//   );
// }


import { useEffect, useState } from "react";
import EventStudent from "@/components/eventStudent";
import EventCard from "@/components/EventCard";

type EventType = {
  _id: string;
  title_event: string;
  description_event: string;
  date_event: string;
  location_event: string;
  image: string;
};

export default function Event() {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/event/get")
      .then((res) => {
        if (res.ok) {

          return res.json();

        }
      })
      .then((data) => {
        setEvents(data);
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-blue-100 rounded-xl shadow-md flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center">📅 Upcoming events</h1>

      <EventStudent size="lg">
        { events && events.map((event, index ) => (
          <EventCard
            title={event.title_event}
            date={event.date_event}
            description={event.description_event}
            image={event.image}
            key={index}
          />
        ))}
      </EventStudent>
    </div>
  );
}

