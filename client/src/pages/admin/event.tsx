import { useEffect, useState } from "react"
import EventAdmin from "@/components/eventAdmin"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom"

type Event = {
  _id: string
  title_event: string
  description_event: string
  date_event: string
  location_event?: string
  image: string
}

const EventPageAdmin = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [form, setForm] = useState({
    title_event: "",
    description_event: "",
    date_event: "",
    image: "",
  })

  const authContext = useContext(AuthContext);

  if (!authContext) {

    console.log("An error Occured when wrapping the App component with the Provider !");

  }

  const { token , loading } = authContext;

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = () => {
    fetch("http://localhost:5000/event/get")
      .then((res) => res.json())
      .then((data) => {
        const mappedEvents = data.map((event: any) => ({
          _id: event._id,
          title_event: event.title_event,
          description_event: event.description_event,
          date_event: event.date_event,
          image: event.image,
        }))
        setEvents(mappedEvents)
      })
      .catch((err) => console.error("Error fetching events:", err))
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddEvent = async () => {
    try {
      const res = await fetch("http://localhost:5000/event/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to add event")

      setForm({
        title_event: "",
        description_event: "",
        date_event: "",
        image: "",
      })
      fetchEvents()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
      return null;
  }

  if (!token) {
      return <Navigate to="/login" replace />;
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-9">
        <h1 className="text-2xl font-bold text-center">📊 Events Dashboard</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className=''>Add Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title_event">Title</Label>
                <Input
                  id="title_event"
                  name="title_event"
                  value={form.title_event}
                  onChange={handleInputChange}
                  placeholder="Event title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date_event">Date</Label>
                <Input
                  id="date_event"
                  type="date"
                  name="date_event"
                  value={form.date_event}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={form.image}
                  onChange={handleInputChange}
                  placeholder=""
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description_event">Description</Label>
                <Textarea
                  id="description_event"
                  name="description_event"
                  value={form.description_event}
                  onChange={handleInputChange}
                  placeholder="Description"
                />
              </div>
              <Button onClick={handleAddEvent}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <EventAdmin events={events} orientation="vertical" />
    </div>
  )
}

export default EventPageAdmin




































































// THE RIGHT ONE 
// import {useEffect, useState} from "react";
// import EventAdmin from "@/components/eventAdmin"
// import EventCardAdmin from '@/components/EventCardAdmin'


// type Event = {
//   _id: string;
//   title_event: string;
//   description_event: string;
//   date_event: string;
//   location_event: string;
//   image: string;
// };

// const EventPageAdmin = () => {
//       const [events, setEvents] = useState<Event[]>([]);

//   useEffect(() => {
//   fetch("http://localhost:5000/event/get")
//     .then((res) => res.json())
//     .then((data) => {
//       const mappedEvents = data.map((event: any) => ({
//         _id: event._id,
//         title_event: event.title_event,
//         description_event: event.description_event,
//         date_event: event.date_event,
//         image: event.image,
//       }));
//       setEvents(mappedEvents);
//     })
//     .catch((err) => console.error("Error fetching events:", err));
// }, []);
//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold text-center mb-9">📊 events dashboard </h1>
//       <EventAdmin events={events} orientation="vertical" />
//     </div>
//   )
// }

// export default EventPageAdmin

































// real code withow add button
// import EventAdmin from "@/components/eventAdmin"

// const dummyEvents = [
//   {
//     id: 1,
//     title: "JavaScript",
//     description: "A little event about JavaScript. We will briefly talk about its use and power.",
//     date: "2025-06-15",
//     image: "/images/JScript.png",
//   },
//   {
//     id: 2,
//     title: "React JS",
//     description: "An introduction to React JS, its purpose, and how to use it in real projects.",
//     date: "2025-06-20",
//     image: "/images/RJS.jpg",
//   },
//   {
//     id: 3,
//     title: "Backend Developer",
//     description: "We will talk about tools and technologies used to build the backend of web applications.",
//     date: "2025-06-25",
//     image: "/images/backend.jpg",
//   },
// ]

// export default function Events() {
//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-blue-100 rounded-xl shadow-md flex flex-col">
//       <h1 className="text-2xl font-bold mb-4 text-center">📊 Events Dashboard</h1>
//       <EventAdmin events={dummyEvents} />
//     </div>
//   )
// }



















// import { useState } from "react"
// import EventAdmin from "@/components/eventAdmin"

// type EventType = {
//   id: number
//   title: string
//   description: string
//   date: string
//   image: string
// }

// export default function Events() {
//   const [events, setEvents] = useState<EventType[]>([
//     {
//       id: 1,
//       title: "JavaScript",
//       description: "y auras une event import de javaScript a partir de 12:00h dans l'école de coding SMTA",
//       date: "2025-06-15",
//       image: "/images/JScript.png",
//     },
//     {
//       id: 2,
//       title: "React JS",
//       description: "y auras une event import de React JS a partir de 15:00h dans l'école de coding SMTA",
//       date: "2025-06-20",
//       image: "/images/RJS.jpg",
//     },
//   ])

//   const [showForm, setShowForm] = useState(false)
//   const [newEvent, setNewEvent] = useState({ title: "", description: "", image: "" , date:""})

//   const handleAddEvent = () => {
//     const event: EventType = {
//       id: events.length + 1,
//       title: newEvent.title,
//       description: newEvent.description,
//       date: newEvent.date,
//       image: newEvent.image,
//     }
//     setEvents([...events, event])
//     setShowForm(false)
//     setNewEvent({ title: "", description: "", image: "" , date: ""})
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-blue-100 rounded-xl shadow-md flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//       <h1 className="text-2xl font-bold ml-80">📊Event Dashboard</h1>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-green-500 text-white px-1 py-1 rounded hover:bg-green-600"
//         >
//           ➕ ADD
//         </button>
//       </div>

//       {showForm && (
//         <div className="mb-4 bg-white p-4 rounded shadow">
//           <input
//             className="w-full p-2 mb-2 border rounded"
//             placeholder=" Event Title"
//             value={newEvent.title}
//             onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//           />
//           <input
//             className="w-full p-2 mb-2 border rounded"
//             placeholder="image path"
//             value={newEvent.image}
//             onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
//           />
//           <input
//             type="date"
//             className="w-full p-2 border rounded"
//             value={newEvent.date}
//             onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
//           />
//           <textarea
//             className="w-full p-2 mb-2 border rounded"
//             placeholder="description"
//             value={newEvent.description}
//             onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
//           ></textarea>
//           <button
//             onClick={handleAddEvent}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Save
//           </button>
//         </div>
//       )}

//       <EventAdmin events={events} />
//     </div>
//   )
// }