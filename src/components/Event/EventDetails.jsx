import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Corousel from "./Image Corousel/Corousel";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceDot, Label, Rectangle } from 'recharts';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/conf';  // Adjust the path as needed
import debounce from 'lodash.debounce';

const EventDetail = () => {
  const { id } = useParams();  // Get event ID from URL
  const [event, setEvent] = useState(null);  // State to hold event details
  const [eventImages, setEventImages] = useState([]);  // State to hold event images
  const [isFetching, setIsFetching] = useState(false);  // State to indicate fetching status
  const [salesData, setSalesData] = useState({});  // State to hold aggregated sales data
  const [categories, setCategories] = useState([]);  // State to hold categories for the selected event
  const [selectedCategory, setSelectedCategory] = useState('');  // State to hold selected category
  

  const fetchEventDetails = useCallback(debounce(async (id) => {
    setIsFetching(true);  // Start fetching
    try {
      const eventDoc = doc(db, 'events', id);  // Reference to Firestore document
      const eventSnap = await getDoc(eventDoc);  // Fetch document
      if (eventSnap.exists()) {
        const eventData = eventSnap.data();  // Get event data
        setEvent(eventData);  // Update event state
        setEventImages(eventData.eventImage || []);  // Update event images
        setSelectedCategory('');  // Reset selected category
      } else {
        console.error('No such document!');  // Log if no document found
      }
    } catch (error) {
      console.log('Error fetching event details:', error);  // Log error
    }
    setIsFetching(false);  // End fetching
  }, 300), []);

  useEffect(() => {
    fetchEventDetails(id);  // Fetch event details when component mounts or ID changes
  }, [id, fetchEventDetails]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        if (!event) return;
        
        const salesDataCollection = collection(db, 'sales_data');  // Reference to sales data collection
        const salesQuery = query(salesDataCollection, where('eventName', '==', event.eventName));  // Filter by eventName
        const salesDataSnapshot = await getDocs(salesQuery);  // Fetch filtered documents

        const aggregatedSalesData = {};
        const eventCategories = new Set();  // Set to collect unique categories

        salesDataSnapshot.forEach(doc => {
          const data = doc.data();  // Get document data
          const category = data.category;

          eventCategories.add(category);  // Collect categories for the dropdown

          if (!aggregatedSalesData[category]) {
            aggregatedSalesData[category] = {
              sales: {},
              futureSales: 0
            };
          }

          for (let year = 2013; year <= 2023; year++) {
            const yearKey = `Sales ${year}`;
            if (!aggregatedSalesData[category].sales[year]) {
              aggregatedSalesData[category].sales[year] = 0;
            }
            aggregatedSalesData[category].sales[year] += Number(data[yearKey]) || 0;  // Aggregate sales data
          }
          aggregatedSalesData[category].futureSales += Number(data['Next Event Sales (Target)']) || 0;
        });

        setSalesData(aggregatedSalesData);  // Update sales data state
        setCategories(Array.from(eventCategories));  // Set categories for the dropdown
        setSelectedCategory(Array.from(eventCategories)[0] || '');  // Set default category
      } catch (error) {
        console.log('Error fetching sales data:', error);  // Log error
      }
    };

    fetchSalesData();  // Fetch sales data when event changes
  }, [event]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);  // Update selected category
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { year, sales } = payload[0].payload;
      return (
        <div className="custom-tooltip flex flex-col bg-white p-2 border border-gray-300 rounded shadow-lg">
          <p className="label">{`Year: ${year}`}</p>
          <p className="intro font-semibold">{`Sales: ${sales}`}</p>
        </div>
      );
    }
    return null;
  };

  const chartData = [];
  const currentCategoryData = salesData[selectedCategory] || {};

  for (let year = 2013; year <= 2023; year++) {
    chartData.push({
      year: year.toString(),
      sales: currentCategoryData.sales?.[year] || 0,
      future: false,
    });
  }

  const futureSalesData = currentCategoryData.futureSales || 0;
  if (futureSalesData) {
    chartData.push({
      year: '',
      sales: futureSalesData,
      future: true,
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 py-0">
      {/* Carousel */}
      <div className="w-full shadow-md mb-0 overflow-hidden">
        <Corousel autoSlides={true} autoSlidesInterval={4000}>
          {eventImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-fill" // Ensure images cover the container
              style={{ height: '400px', width: '70%' }} // Fixed height for square images
            />
          ))}
        </Corousel>
      </div>

      <div className="max-w-4xl w-full flex flex-col items-center gap-5 mb-28 px-4 mt-5">
        {/* Event Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
          <h1 className="text-3xl font-bold mb-4">{event?.eventName}</h1>
          <p className="text-xl mb-2 text-gray-700">
            <span className='font-bold'>Location:</span> {event?.location}
          </p>

          <div className="flex flex-row justify-between gap-4 mb-4">
            <p className="text-lg text-gray-600">
              <span className='font-bold'>Date:</span> {event?.date}
            </p>
            <p className="text-lg text-gray-600">
              <span className='font-bold'>Duration:</span> {event?.duration}
            </p>
          </div>
        </div>

        {/* About Event Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-lg text-gray-600">{event?.about}</p>
        </div>

        {/* Selected Category Sales Data */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
          <div className="flex flex-col mb-10">
            <label htmlFor="category" className="block text-lg font-semibold mb-2">Select Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border border-gray-300 rounded-md p-2 w-full max-w-xs" // Limited width
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <h3 className="text-xl font-semibold mb-5">{selectedCategory} Sales Over the Years</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 20, right: 80, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year"
                angle={-20} // Rotate the labels by -20 degrees
                textAnchor="end" // Align text to end
                interval={0} // Show all labels 
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#f472b6" // Color for the sales line
                strokeWidth={3}
                dot={{ stroke: '#f472b6', strokeWidth: 1, fill: 'white', r: 6 }}
              />
              {futureSalesData > 0 && (
                <ReferenceDot x="" y={futureSalesData} fill="orange" stroke="orange">
                  <Label 
                    value={`Predicted Sales: ${futureSalesData}`} 
                    position="top" 
                    offset={10} 
                    style={{ fill: 'orange', fontSize: '14px', fontWeight: 'bold' }} // Customize styles here
                  />
              
                </ReferenceDot>
              )}
            </LineChart>
          </ResponsiveContainer>
        <p className='text-red-500 mt-4'>*Note: The Predicted sales value may differ from actual sales value.</p>
        </div>

      </div>

      
    </div>
  );
};

export default EventDetail;
