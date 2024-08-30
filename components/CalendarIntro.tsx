"use client";
import React from 'react';
import { ReactTyped } from 'react-typed';

const CalendarIntro: React.FC = () => {
    return (
        <div className="text-center py-10">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 ">
                Welcome To The Calendar
            </h1>
            <ReactTyped
                strings={[
                    "Here you can Add Event",
                    "Here you can view Event",
                    "Here you can schedule your Event",
                    "Here you can manage and arrange your Events"
                ]}
                typeSpeed={50}
                backSpeed={30}
                loop
                className="text-2xl font-medium text-[#d6a354] mt-4"
            />

        </div>
    );
};

export default CalendarIntro;