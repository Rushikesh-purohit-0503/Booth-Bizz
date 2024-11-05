import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import EventCard from './EventCard';
import { collection, getDocs, query, limit, startAfter } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/conf';

function EventPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('City');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastVisible, setLastVisible] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const dropdownRef = useRef(null);

  const fetchEvents = useCallback(async (lastDoc = null) => {
    setIsFetching(true);
    try {
      const eventsQuery = lastDoc
        ? query(collection(db, 'events'), startAfter(lastDoc), limit(10))
        : query(collection(db, 'events'), limit(14));

      const querySnapshot = await getDocs(eventsQuery);
      const eventsData = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const eventData = doc.data();
        const imagePath = eventData.eventImage[0].replace('gs://boothbiz.appspot.com/', '');
        const imgRef = ref(storage, imagePath);
        const imgUrl = await getDownloadURL(imgRef);
        return { id: doc.id, ...eventData, imageUrl: imgUrl };
      }));

      // Ensure uniqueness by creating a map with event IDs as keys
      const eventsMap = new Map();
      [...events, ...eventsData].forEach(event => eventsMap.set(event.id, event));

      setEvents(Array.from(eventsMap.values()));
      setFilteredEvents(Array.from(eventsMap.values()));
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } catch (error) {
      console.error('Error fetching events: ', error);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleShowDetails = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsDropdownOpen(false);
    filterEvents(city, ''); // Filter events on city select with an empty search query
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSearchButtonClick = () => {
    filterEvents(selectedCity, searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      filterEvents(selectedCity, searchQuery);
    }
  };

  const filterEvents = (city, searchQuery) => {
    let filtered = events;
    // console.log(filtered);
    
    // Filter by selected city
    if (city !== 'City') {
      filtered = filtered.filter(event => event.city && event.city.trim().toLowerCase() === city.trim().toLowerCase());
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event => 
        (event.city && event.city.trim().toLowerCase().includes(searchQuery.toLowerCase())) || 
        (Array.isArray(event.category) && event.category.some(category => category.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }
    

    setFilteredEvents(filtered);
  };

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
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a
                  href="#"
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleCitySelect('City')}
                >
                  City
                </a>

                <a
                  href="#"
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleCitySelect('Ahmedabad')}
                >
                  Ahmedabad
                </a>

                <a
                  href="#"
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleCitySelect('Surat')}
                >
                  Surat
                </a>

                <a
                  href="#"
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleCitySelect('Vadodara')}
                >
                  Vadodara
                </a>

                <a
                  href="#"
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleCitySelect('Mumbai')}
                >
                  Mumbai
                </a>

                <a
                  href="#"
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleCitySelect('Goa')}
                >
                  Goa
                </a>

                <a
                  href="#"
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleCitySelect('Pune')}
                >
                  Pune
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
            onChange={(e) => handleSearch(e.target.value)}
            onKeyPress={handleKeyPress} // Add key press handler
          />
          <button 
            className="bg-red-300 text-black px-6 py-2 rounded-r-md hover:bg-red-400 transition duration-300"
            onClick={handleSearchButtonClick} // Trigger filtering on button click
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 z-0">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            src={event.imageUrl}
            event={event}
            onShowDetails={handleShowDetails}
          />
        ))}
      </div>

      {isModalOpen && selectedEvent && (
        <div id="event-detail-modal" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-3xl w-2/4 h-4/6 overflow-hidden relative">
            <span className="absolute top-2 right-2 text-2xl cursor-pointer" onClick={closeModal}>
              &times;
            </span>
            <img
              src={selectedEvent.imageUrl}
              alt={selectedEvent.eventName}
              className="w-full h-72 object-fill rounded-lg mb-4" // Set fixed height for image
            />
            <h3 id="event-detail-eventName" className="text-2xl font-bold mb-2">
              {selectedEvent.eventName}
            </h3>
            <p id="event-detail-location" className="text-lg mb-3">
              <span className='font-bold'>Location:</span> {selectedEvent.location}
            </p>
            <p id="event-detail-date" className="text-lg mb-3">
              <span className='font-bold'>Date:</span> {selectedEvent.date}
            </p>
            <p id="event-detail-about" className="text-md overflow-y-auto" style={{ maxHeight: '50%' }}>
              <span className='font-bold'>About:</span> {selectedEvent.about}
            </p>
          </div>
        </div>
      )}

      {isFetching && <div>Loading more events...</div>}

      
    </main>
  );
}

export default EventPage;
