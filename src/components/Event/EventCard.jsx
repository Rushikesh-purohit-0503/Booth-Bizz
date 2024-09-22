import React from 'react'

const EventCard = ({ src,event, onShowDetails }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg cursor-pointer" onClick={() => onShowDetails(event)}>
      <img src={src} alt={event.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <hr className="mb-2" />
        <h3 className="text-xl font-semibold text-black">{event.title}</h3>
        <p className="text-gray-600">{event.location}</p>
        <p className="text-gray-600">{event.date}</p>
        <button onClick={onShowDetails} className="mt-2 bg-red-300 text-black px-4 py-2 rounded hover:bg-red-400 transition duration-300">View Detail</button>
      </div>
    </div>
  );

export default EventCard