import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import HomeImg from "../assets/HomePage.png";
import ExpenseImg from "../assets/events-image.png";
import StallImg from "../assets/stall-image.png";
import PosImg from "../assets/pos-image.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ContactUs from "../components/Contact/ContactUs";
import Service from './Services';



const Section = ({ title, description, image, linkText, linkTo, reverse }) => (
  <div className={`max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12 mb-28 mt-8 ${reverse ? 'md:flex-row-reverse' : ''}`}>

    <div className="w-full mb-8 md:mb-0">
      <img src={image} alt={title} className="w-full h-auto rounded-3xl shadow-2xl" />
    </div>
    <div className="max-w-xl">
      <h2 className="text-5xl font-bold mb-4">
        {title}{' '}
        <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
          {description.highlight}
        </span>
      </h2>
      <p className="text-black text-lg mb-5 font-semibold">{description.text}</p>
      <Link
        to={linkTo}
        className="inline-block bg-red-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-red-400 transition-transform transform hover:-translate-y-1 hover:scale-105"
      >
        {linkText}
        <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
      </Link>
    </div>
  </div>
);

function HomePage() {
  const authStatus = useSelector((state) => state.auth.status);
  const location = useLocation();





  useEffect(() => {
    if (location.state?.sectionId) {
      if (location.state.sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const section = document.getElementById(location.state.sectionId);
        section?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);


  const heroContent = (
    <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12 mb-28">
      <div className="max-w-xl">
        <h1 className="text-5xl font-bold mb-4">
          Elevate Your Business on Stalls with{' '}
          <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
            Seamless Management
          </span>{' '}
          and Smart Sales.
        </h1>
        <p className="text-gray-600 text-lg mb-5 font-semibold">
          BoothBiz streamlines your business with intuitive management tools and smart sales solutions for any event or market.
        </p>
        <Link
          to={authStatus ? '/events' : '/signin'}
          className="inline-block bg-red-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-red-400 transition-transform transform hover:-translate-y-1 hover:scale-105"
        >
          Explore
        </Link>
      </div>
      <div className="w-full mt-8 mb-10">
        <img src={HomeImg} alt="Stall Management Illustration" className="w-full h-auto rounded-3xl shadow-2xl" />
      </div>
    </div>
  );

  const sections = [
    {
      title: 'A Quick 4-Step',
      description: {
        highlight: 'Expense',
        text: 'Enter the date, description, category, and amount to add an expense. Easily edit entries as needed. Customize your categories for personalized tracking with our Expense Tracker.',
      },
      image: ExpenseImg,
      linkText: 'Explore Feature',
      linkTo: '/dashboard',
    },
    {
      title: 'A Quick & Versatile Solution for Managing your',
      description: {
        highlight: 'Stalls',
        text: 'Add single or multiple stalls for various events, all displayed in one place. Track details such as expenses and POS data for efficient stall management.',
      },
      image: StallImg,
      linkText: 'Explore Feature',
      linkTo: '/dashboard',
      reverse: true,
    },
    {
      title: 'Streamline Your Sales with Our',
      description: {
        highlight: 'Point of Sales (POS)',
        text: 'Optimize your business with real-time inventory and sales analytics. Enhance efficiency and customer experience with our POS solution.',
      },
      image: PosImg,
      linkText: 'Explore Feature',
      linkTo: '/dashboard',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      {heroContent}

      {
        authStatus && (
          <>
            <section id='services'>
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 mt-16">
                Our Services
              </h1>
              {
                sections.map((section, index) => (
                  <>
                    <Section key={index} {...section} />

                  </>
                )
                )
              }
            </section>
            <section id="contact">
              <ContactUs />
            </section>
          </>
        )
      }
      {!authStatus && (
        <>
          <section id="services">
            <Service />
          </section>
          <section id="contact">
            <ContactUs />
          </section>
        </>
      )}
    </div>
  );




}

export default HomePage;
