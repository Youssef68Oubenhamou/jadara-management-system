
import React from "react"
import EventAdmin from "@/components/eventAdmin"

const dummyEvents = [
  {
    title: "javaScript",
    description: "a little event of javaScript course , in that event we will just talk breafly about javaScript",
    date: "2025-06-15",
    image: "public/images/JScript.png",
  },
  {
    title: "React JS",
    description: "little introduction in React js and why and how we use it",
    date: "2025-06-20",
    image: "public/images/RJS.jpg",
  },
  {
    title: "backend develloper",
    description: "in that events we will talk about the tols and tecnology that we use to build a backend of web application",
    date: "2025-06-25",
    image: "public/images/backend.jpg",
  },
]

const EventPageAdmin = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-center mb-9">📊 events dashboard </h1>
      <EventAdmin events={dummyEvents} orientation="vertical" />
    </div>
  )
}

export default EventPageAdmin
