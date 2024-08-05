'use client';

import { useState, useEffect } from 'react';
import  supabase  from '@/utils/supabase/client';
import Link from 'next/link';
import { MagnifyingGlassIcon, ExclamationTriangleIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Listbox } from '@headlessui/react';

async function fetchEventss(searchQuery = '') {
    console.log("fecthing events");
    const currentDate = new Date().toISOString();

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .gt('start_time', currentDate)
        .ilike('title', `%${searchQuery}%`); // Use ilike for case-insensitive matching

    
    console.log(data);

    if (error) {
        console.error('Error fetching events:', error);
        return [];
    }
    return data;
}

export default function SearchEvents( { label = 'Upcoming Events' }) {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const eventsData = await fetchEventss(searchQuery);
            setEvents(eventsData);
        };

        fetchData();
    }, []); // Fetch events when searchQuery changes

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    
    return (
        <div className="px-4 sm:px-6 lg:px-8 w-2/3 mx-auto mt-28">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="font-bold text-2xl leading-6 text-purple-950">{label}</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the events in your account including their title, status and price.
                    </p>
                </div>

                {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button type="button" className="block rounded-md bg-purple-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Add Event
                    </button>
                </div> */}
            </div>

            <div className="mt-8 flex items-center space-x-4">
                {/* SEARCH START HERE */}
                <div className="flex-1 max-w-lg lg:max-w-xs">
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
                <form className="w-64">
                    <div className="relative ">
                        <Listbox>
                            <Listbox.Button className="relative w-full cursor-default rounded-md h-9 bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <span className="block truncate">{/* {selected} */}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                                </span>
                            </Listbox.Button>

                            <Listbox.Options
                                transition
                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm">
                                {events.map((event) => (
                                    <Listbox.Option
                                        key={event.id}
                                        value={event}
                                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                                    >
                                        <span className="block truncate font-normal group-data-[selected]:font-semibold">{event.category}</span>

                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                            <CheckIcon aria-hidden="true" className="h-5 w-5" />
                                        </span>
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Listbox>
                    </div>
                </form>
                {/* LISTBOX END HERE */}
            </div>

            <div className="-mx-4 -my-2 sm:-mx-6 lg:-ml-28">
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
            </div>
        </div>
    );
}
