'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { MagnifyingGlassIcon, ExclamationTriangleIcon, ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import EventListbox from './EventListbox';



async function fetchEventss(searchQuery = '', category = '') {
    console.log("fecthing events");
    const currentDate = new Date().toISOString();
    const supabase = createClient();
    let query = supabase
        .from('events')
        .select('*')
        .gt('start_time', currentDate)
        .ilike('title', `%${searchQuery}%`); // Use ilike for case-insensitive matching

    if (category) {
        query = query.eq('category', category)
    }
    const { data, error } = await query;

    console.log(data);
    if (error) {
        console.error('Error fetching events:', error);
        return [];
    }
    return data;
}

export default function SearchEvents({ label = 'Upcoming Events' }) {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    /*const [filteredEvents, setFilteredEvents] = useState(events);*/
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const eventsData = await fetchEventss(searchQuery, selectedEvent ? selectedEvent.category : '');
            setEvents(eventsData);
            /*             setFilteredEvents(eventsData);
             */
        }
        fetchData();
    }, [searchQuery, selectedEvent]); // Fetch events when searchQuery changes

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        /* setSearchQuery(value);
        setFilteredEvents(events.filter(event => event.category.toLowerCase().includes(value.toLowerCase()))); */
    };

    const handleClearCategory = () => {
        setSelectedEvent(null);
        setSearchQuery('');
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 w-full sm:w-2/3 mx-auto mt-28">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="font-bold text-2xl leading-6 text-purple-950">{label}</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the events in your account including their title, status and price.
                    </p>
                </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* SEARCH START HERE */}
                <div className="flex-1 w-full sm:max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="search"
                            name="search"
                            type="search"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-900 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                {/* SEARCH END HERE */}

                {/* LISTBOX START HERE */}
                <form className="w-full sm:w-64">
                    <div className="relative">
                        <EventListbox events={events} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />

                    </div>
                </form>
                {/* LISTBOX END HERE */}
                <button onClick={handleClearCategory} className="ml-2 px-1 py-2 text-red-600 text-sm ">
                    Clear Filters
                </button>
            </div>

            <div className="-mx-4 -my-2 sm:-mx-6 lg:-ml-28 overflow-x-auto xl:overflow-visible mt-3">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    {events.length === 0 ? (
                        <div className="mt-20 border-l-4 border-purple-900 bg-purple-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <ExclamationTriangleIcon aria-hidden="true" className="h-5 w-5 text-yellow-300" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-purple-700">
                                        There's no events existed.{' '}
                                        <a href="/protected" className="font-medium text-purple-700 underline hover:text-purple-600">
                                            Please add/create new event to show here.
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Description
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Price
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Location
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Start Time
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        End Time
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Category
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Capacity
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">

                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {events.map((event) => (
                                    <tr key={event.id} className="relative hover:bg-gray-50">
                                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                                            <Link href={`/event-details/${event.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                {event.title}
                                            </Link>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.description}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.price}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.status}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.location}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(event.start_time).toLocaleDateString()}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(event.end_time).toLocaleDateString()}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.category}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.capacity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <nav className="w-1/2 flex items-center justify-between mx-auto py-5 border-t border-gray-200 px-4 sm:px-0">
                    <div className="-mt-px flex w-0 flex-1">
                        <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            <ArrowLongLeftIcon aria-hidden="true" className="mr-3 h-5 w-5 text-gray-400" />
                            Previous
                        </a>
                    </div>
                    <div className="hidden md:-mt-px md:flex">
                        <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            1
                        </a>
                        {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
                        <a
                            href="#"
                            aria-current="page"
                            className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
                        >
                            2
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            3
                        </a>
                        <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                            ...
                        </span>
                        <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            8
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            9
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            10
                        </a>
                    </div>
                    <div className="-mt-px flex w-0 flex-1 justify-end">
                        <a
                            href="#"
                            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            Next
                            <ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5 text-gray-400" />
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    );
}