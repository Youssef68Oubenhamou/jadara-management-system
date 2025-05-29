import React from "react";

type EventCardProps = {
  title: string;
  date: string;
  description: string;
  image: string
};

const EventCard = ({ title, date, description, image }: EventCardProps) => {
  return (
    <div className="bg-yellow-100 text-black rounded-xl shadow-md p-4 w-full h-full flex flex-raw">
      <img
        src={image}
        className="w-30 h-30 object-cover rounded-md mb-2"
      />
      <div className="flex flex-col">
        <div className=" w-100 flex flex-col items-center ml-14">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="text-sm text-gray-600">{date}</p>
            <p className="text-sm mt-2">{description}</p>
        </div>
        <div className="w-full flex justify-center">
            <button className="mt-9 w-60 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">more details</button>
        </div>
      </div>
    </div>

  );
};

export default EventCard;