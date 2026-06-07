import { useEffect, useState, useContext } from "react" 
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog"
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { AuthContext } from "../../context/AuthContext"
import { Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
    title_event: z.string(),
    description_event: z.string(),
    date_event: z.string(),
    location_event: z.string(),
    image: z.string(),
})

type FormValues = z.infer<typeof formSchema>

type Event = {
    _id: string
    title_event: string
    description_event: string
    location_event: string
    date_event: string
    image: string
}

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const EventPageAdmin = () => {
    const [events, setEvents] = useState<Event[]>([])
    const [formData, setFormData] = useState<FormValues>({
        title_event: "",
        description_event: "",
        date_event: "",
        location_event: "",
        image: "",
    })

    const authContext = useContext(AuthContext)
    if (!authContext) return null
    const { token, loading } = authContext

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: formData,
    })

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
                    location_event: event.location_event,
                    date_event: event.date_event,
                    image: event.image,
                }))
                setEvents(mappedEvents)
            })
            .catch((err) => console.error("Error fetching events:", err))
    }

    // const handleInputChange = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    // ) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value })
    // }

    const handleAddEvent = async (values: FormValues) => {

        const eventRecord = {

            title_event: values.title_event ,
            description_event: values.description_event,
            location_event: values.location_event,
            date_event: values.date_event,
            image: values.image            

        }

        fetch("http://localhost:5000/event/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(eventRecord),
        })
            .then((response) => { 

                console.log(response);
                return response.json();

            })
            .then((data) => {

                console.log(data);

            })
            .catch((err) => {

                console.log(`An error occured when trying to update the user : ${err}`);

            })

        // const newEvent = await res.json()
        // setEvents([...events, newEvent]);
        // setFormData({ title_event: "", description_event: "", date_event: "", location_event: "", image: "" });

        form.reset();
    }

    const handleUpdate = (id: string, values: FormValues) => {
        const updatedEvent = { _id: id, ...values }

        fetch(`http://localhost:5000/event/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(updatedEvent),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                // fetchEvents()
            })
            .catch((err) => {
                console.error("Error updating event:", err)
            })

        form.reset()
    }

    const handleDelete = async (id: string) => {
      try {
        const res = await fetch(`http://localhost:5000/event/remove/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error("Failed to delete event")

        fetchEvents()
      } catch (err) {
        console.error(err)
      }
    }

    if (loading) return null
    if (!token) return <Navigate to="/login" replace />

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild><Button variant="outline">+ Add Event</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Create an event :</DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleAddEvent)} className="space-y-5 w-100">
                                <FormField
                                    control={form.control}
                                    name="title_event"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="title" {...field} />
                                            </FormControl>
                                            <FormDescription>This is event title.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="date_event"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date</FormLabel>
                                            <FormControl>
                                                <Input type="date" placeholder="date" {...field} />
                                            </FormControl>
                                            <FormDescription>This is event date.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="location_event"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="location" {...field} />
                                            </FormControl>
                                            <FormDescription>This is event location.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description_event"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="description" {...field} />
                                            </FormControl>
                                            <FormDescription>This is course description.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            form.setValue("image", reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}/>
                                            </FormControl>
                                            <FormDescription>This is event image.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Add Event</Button>
                            </form>
                        </Form>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Table>
                <TableCaption>A list of recent Events.</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {events.map((event) => (
                        <TableRow key={event._id}>
                            <TableCell className="font-medium">
                              {event._id}
                            </TableCell>

                            <TableCell className="w-56 whitespace-normal break-words">
                                <div className="line-clamp-3">{event.title_event}</div>
                            </TableCell>

                            <TableCell className="w-56 whitespace-normal break-words max-w-xs">
                                <div className="line-clamp-3">
                                    {event.description_event}
                                </div>
                            </TableCell>

                            <TableCell>
                                {formatDate(event.date_event)}
                            </TableCell>

                            <TableCell className="w-56 whitespace-normal break-words">
                                <div className="line-clamp-2">{event.location_event}</div>
                            </TableCell>

                            <TableCell>
                                <img
                                    src={event.image}
                                    alt={event.title_event}
                                    className="h-16 w-24 object-cover rounded"
                                />
                            </TableCell>

                            <TableCell className="flex gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            className="bg-green-500"
                                        >
                                            Update
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                              Update Event : {event._id}
                                            </DialogTitle>

                                            <DialogDescription>
                                                <Form {...form}>
                                                    <form
                                                        onSubmit={form.handleSubmit((values) =>
                                                            handleUpdate(event._id, values)
                                                        )}
                                                        className="space-y-5"
                                                    >
                                                        <FormField
                                                            control={form.control}
                                                            name="title_event"
                                                            defaultValue={event.title_event}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Title</FormLabel>
                                                                    <FormControl>
                                                                        <Input type="text" {...field} />
                                                                    </FormControl>
                                                                    <FormDescription>This is event title.</FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="description_event"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Description</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="date_event"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Date</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            type="date"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="location_event"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Location</FormLabel>
                                                                    <FormControl>
                                                                        <Input type="text" placeholder="location" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            name="image"
                                                            control={form.control}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Image</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onChange={(e) => {
                                                                                const file = e.target.files?.[0];
                                                                                if (file) {
                                                                                    const reader = new FileReader();
                                                                                    reader.onloadend = () => {
                                                                                        form.setValue("image", reader.result as string);
                                                                                    };
                                                                                    reader.readAsDataURL(file);
                                                                                }
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <Button
                                                            type="submit"
                                                            className="bg-green-500"
                                                        >
                                                            Update Event
                                                        </Button>
                                                    </form>
                                                </Form>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>

                                <Button
                                    className="bg-red-500"
                                    onClick={() => handleDelete(event._id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default EventPageAdmin