// components/EventCard.tsx
type EventCardProps = {
  title: string
  description: string
  date: string
  image: string
}

const EventCardAdmin = ({ title, description, date, image }: EventCardProps) => {
  return (
    <div className="bg-yellow-100 rounded-xl shadow-md p-4 text-black w-full h-full">
      <img src={image} className="w-full h-40 object-cover rounded-md mb-2" />
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-red-600">{date}</p>
      <p className="text-sm mt-2">{description}</p>
    </div>
  )
}

export default EventCardAdmin;
