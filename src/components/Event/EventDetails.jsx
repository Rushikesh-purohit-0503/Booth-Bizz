import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import HomePageImage from "../../assets/HomePage.png";

const EventDetail = () => {

  

  // Sample events data - replace this with your actual data source
  const events = 
    { id: 1, title: 'WhiteFlea', location: 'Surat', date: '2024-11-01', description: 'Discover the latest fashion trends and unique accessories at this vibrant showcase.',duration: '3 Hrs.' }
    // ...other events
  ;



  const topProductsData = [
    { name: 'Nachos', sales: 12 },
    { name: 'Brownie', sales: 19 },
    { name: 'Mocktail', sales: 3 },
    { name: 'French Fries', sales: 5 },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img 
          src={ events.image||HomePageImage} 
          alt={events.title} 
          className="w-auto h-auto object-cover rounded-md mb-4 mx-auto" // Center the image
        />
        <h2 className="text-3xl font-bold mb-2">{events.title}</h2>
        <p className="text-lg mb-2"><span className="font-bold">Date:</span> {events.date}</p> {/* Make the title bold */}
        <p className="text-lg mb-2"><span className="font-bold">Duration:</span> {events.duration}</p>
        <p className="text-lg mb-2 "><span className="font-bold">Location:</span> {events.location}</p>
        <p className="text-md mb-4 font-bold">{events.description}</p>
        
        <h3 className="text-xl font-semibold mb-2">Top Selling Products</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProductsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#f89b94" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EventDetail;
