
import React from "react";
import EventStudent from "@/components/eventStudent";
import EventCard from "@/components/EventCard";

const events = [
  { title: "javaScript event", image:"public/images/JS.png", date: "2025-06-01", description: "y auras une event import la prochaine semaine à partir de 12:00h dans l'école de coding SMTA" },
  { title: "mongoDB event",image:"public/images/mongoDB.jpg", date: "2025-06-10", description: "y auras une event import la prochaine semaine à partir de 12:00h dans l'école de coding SMTA" },
  { title: "NODE event",image:"public/images/NODE.jpg", date: "2025-06-15", description: "third event desxeption" },
  { title: "React event", image:"public/images/React.avif",date: "2025-06-20", description: "fourt event description" },
  { title: "EVENT 5",image:"public/images/mongoDB.jpg", date: "2025-06-25", description: "fifth event description" },
];

export default function Event() {
  return (
<div className="max-w-4xl mx-auto p-6 bg-blue-100 rounded-xl shadow-md flex flex-col ">
  <h1 className="text-2xl font-bold mb-4 text-center">📅 Upcoming events</h1>

  <EventStudent size="lg">
    {events.map((event) => (
      <EventCard
        title={event.title}
        date={event.date}
        description={event.description}
        image={event.image}
      />
    ))}
  </EventStudent>
</div>
  );
}

