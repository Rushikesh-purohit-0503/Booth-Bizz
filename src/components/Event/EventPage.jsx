import React,{useState,useEffect} from 'react'
import { ChevronDown } from 'lucide-react';
import EventCard from './EventCard';
import HomePageImage from "../../assets/HomePage.png"
import { useRef } from 'react';
function EventPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState('City');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const dropdownRef=useRef(null)
    const events = [
      { id: 1, title: 'XYZ Event', location: 'Surat', date: '30-08-2024', description: 'This is a description of XYZ Event.' },
      { id: 2, title: 'XYZ Event', location: 'Surat', date: '30-08-2024', description: 'This is a description of XYZ Event.' },
      { id: 3, title: 'XYZ Event', location: 'Surat', date: '30-08-2024', description: 'This is a description of XYZ Event.' },
      { id: 4, title: 'XYZ Event', location: 'Surat', date: '30-08-2024', description: 'This is a description of XYZ Event.' },
      { id: 5, title: 'XYZ Event', location: 'Surat', date: '30-08-2024', description: 'This is a description of XYZ Event.' },
    ];
  
    const handleShowDetails = (event) => {
      setSelectedEvent(event);
      setIsModalOpen(true);
    };
  
    const handleCitySelect = (city) => {
      setSelectedCity(city);
      setIsDropdownOpen(false);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedEvent(null);
    };
    // Close dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
          }
        };
    
        // Add event listener to detect clicks outside the dropdown
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          // Clean up the event listener on component unmount
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [dropdownRef]);
    return (
        <main className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-5 my-10 relative z-10">
            <div className="relative inline-block" ref={dropdownRef}>
              <button
                className="bg-red-300 text-black px-8 py-2 rounded text-lg flex items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedCity}
                <ChevronDown className="ml-2 h-5 w-5" />
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a
                      href="#"
                      className="block px-4 py-2 text-lg  text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => handleCitySelect('Surat')}
                    >
                      Surat
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-lg  text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => handleCitySelect('Ahmedabad')}
                    >
                      Ahmedabad
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2  text-lg text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => handleCitySelect('Baroda')}
                    >
                      Baroda
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center bg-white rounded-md shadow-md">
              <input
                type="text"
                placeholder="Search Events"
                className="px-4 py-2 w-96 rounded-l-md focus:outline-none"
              />
              <button className="bg-red-300 text-black px-6 py-2 rounded-r-md hover:bg-red-400 transition duration-300">
                Search
              </button>
            </div>
          </div>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 z-0">
            {events.map((event) => (
              <EventCard
                key={event.id}
                src={HomePageImage}
                event={event}
                onShowDetails={handleShowDetails}
              />
            ))}
          </div>
    
          {isModalOpen && selectedEvent && (
            <div id="event-detail-modal" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
                <span className="absolute top-2 right-2 text-2xl cursor-pointer" onClick={closeModal}>
                  &times;
                </span>
                <img src={HomePageImage} alt={selectedEvent.title} className="w-full rounded-md mb-4" />
                <h3 id="event-detail-title" className="text-2xl font-bold mb-2">
                  {selectedEvent.title}
                </h3>
                <p id="event-detail-location" className="text-lg mb-1">
                  Location: {selectedEvent.location}
                </p>
                <p id="event-detail-date" className="text-lg mb-1">
                  Date: {selectedEvent.date}
                </p>
                <p id="event-detail-description" className="text-md">
                  {selectedEvent.description}
                </p>
              </div>
            </div>
          )}
        </main>
      );
}

export default EventPage