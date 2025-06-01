// type EventCardProps = {
//   title: string
//   description: string
//   date: string
//   image: string
// }

// const EventCardAdmin = ({ title, description, date, image }: EventCardProps) => {
//   return (
//     <div className="bg-yellow-100 rounded-xl shadow-md p-2 text-black w-full h-full">
//       <img src={image} className="w-full h-40 object-cover rounded-md mb-2" />
//       <div className="flex">
//             <span>
//                 <h2 className="text-lg font-bold">{title}</h2>
//                 <p className="text-sm text-red-600">{date}</p>
//                 <p className="text-sm mt-2">{description}</p>
//             </span>
//             <span className="w-120 h-30 flex justify-end items-end">
//                     <button className="mt-2 mr-1 h-8 w-16 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 shadow-md rounded-xl">update</button>
//                     <button className="mt-9 w-16 h-8 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 shadow-md rounded-xl">delete</button>
//             </span> 
//       </div>
//     </div>
//   )
// }

// export default EventCardAdmin





// components/EventCardAdmin.tsx
type EventCardProps = {
  title: string
  description: string
  date: string
  image: string
}

const EventCardAdmin = ({ title, description, date, image }: EventCardProps) => {
  return (
    <div className="bg-yellow-100 rounded-xl shadow-md p-4 text-black w-full h-full flex flex-col justify-between">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-red-600">{date}</p>
        <p className="text-sm mt-2">{description}</p>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button className="h-8 w-16 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 shadow-md">
          Update
        </button>
        <button className="h-8 w-16 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 shadow-md">
          Delete
        </button>
      </div>
    </div>
  )
}

export default EventCardAdmin