import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from "react-feather";

const Corousel = ({ children: slides, autoSlides = false, autoSlidesInterval = 4000 }) => {
    const totalSlides = slides.length;
    const [curr, setCurr] = useState(0);

    const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

    useEffect(() => {
        if (!autoSlides) return;
        const slideInterval = setInterval(next, autoSlidesInterval);
        return () => clearInterval(slideInterval);
    }, [autoSlides, autoSlidesInterval, next]);

    return (
        <div className='overflow-hidden relative w-full flex items-center justify-center bg-soft-pink'>
            <div className='flex transition-transform ease-in-out duration-700' style={{ transform: `translateX(-${curr * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className='min-w-full flex items-center justify-center relative'>
                        <div className='absolute' />
                        {slide}
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button onClick={prev} className='p-3 rounded-full shadow bg-gray-300 text-gray-800 hover:bg-gray-400 transition duration-200'>
                    <ChevronLeft />
                </button>
                <button onClick={next} className='p-3 rounded-full shadow bg-gray-300 text-gray-800 hover:bg-gray-400 transition duration-200'>
                    <ChevronRight />
                </button>
            </div>
            <div className='absolute bottom-4 right-0 left-0'>
                <div className='flex items-center justify-center gap-2'>
                    {slides.map((_, i) => (
                        <div key={i} className={`transition-all w-2 h-2 rounded-full bg-white ${curr === i ? "opacity-100 scale-125" : "opacity-50 scale-100"}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Corousel;
