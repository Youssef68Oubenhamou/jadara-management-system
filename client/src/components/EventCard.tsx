import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


type EventCardProps = {
    title: string;
    date: string;
    description: string;
    location: string;
    image: string
};

const EventCard = ({ title, date, description, image, location }: EventCardProps) => {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src={image}
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
            <CardHeader>
                <CardAction>
                    <Badge variant="secondary">{date}</Badge>
                </CardAction>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    <p className="line-clamp-3">
                        {description}
                    </p>
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full">View Event</Button>
                    </DialogTrigger>
                    <DialogContent className="p-0">
                        <DialogHeader>
                        <DialogTitle><img
                            src={image}
                            alt="Event cover"
                            className="relative rounded-lg z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                        /></DialogTitle>
                        <DialogDescription className="px-6">
                            {title}
                        </DialogDescription>
                        </DialogHeader>
                        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-6">
                            {Array.from({ length: 1 }).map((_, index) => (
                                <p key={index} className="mb-4 leading-normal">
                                    {description}
                                </p>
                            ))}
                            <Badge variant="secondary">{location}</Badge>
                            <Badge variant="secondary">{date}</Badge>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>

    );
};

export default EventCard;