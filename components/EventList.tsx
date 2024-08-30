// path: components/EventList.tsx
"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ExclamationTriangleIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import EditEventForm from './EditEventForm';

type Event = {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    start_time: string;
    end_time: string;
    category: string;
    capacity: number;
};

type EventListProps = {
    events: Event[];
};

const deleteEvent = async (eventId: number) => {
    const supabase = createClient();

    try {
        // Step 1: Fetch all registrations related to the event
        const { data: registrations, error: fetchError } = await supabase
            .from('registrations')
            .select('id')
            .eq('event_id', eventId);

        if (fetchError) {
            throw fetchError;
        }

        // Step 2: Delete all fetched registrations
        const registrationIds = registrations.map(reg => reg.id);
        const { error: deleteRegistrationsError } = await supabase
            .from('registrations')
            .delete()
            .in('id', registrationIds);

        if (deleteRegistrationsError) {
            throw deleteRegistrationsError;
        }

        // Step 3: Delete the event
        const { error: deleteEventError } = await supabase
            .from('events')
            .delete()
            .eq('id', eventId);

        if (deleteEventError) {
            throw deleteEventError;
        }

        console.log('Event deleted successfully');
        return true;
    } catch (error) {
        console.error('Error deleting event:', error);
        return false;
    }
};

export default function EventList({ events }: EventListProps) {
    const [showAlert, setShowAlert] = useState(false);
    const [eventList, setEventList] = useState(events);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    const handleDelete = async (eventId: number) => {
        const success = await deleteEvent(eventId);
        if (success) {
            setEventList(eventList.filter(event => event.id !== eventId));
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000); // Hide the alert after 3 seconds
        }
    };
    const handleEdit = (event: Event) => {
        setEditingEvent(event);
    };

    return (
        <div className="rounded-md w-full mt-5 overflow-x-scroll lg:overflow-visible">
            {showAlert && (
                <div className="rounded-md bg-green-50 p-4 mb-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">Event deleted successfully</p>
                        </div>
                        <div className="ml-auto pl-3">
                            <div className="-mx-1.5 -my-1.5">
                                <button
                                    type="button"
                                    className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                                    onClick={() => setShowAlert(false)}>
                                    <span className="sr-only">Dismiss</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {editingEvent ? (
                <EditEventForm event={editingEvent} onClose={() => setEditingEvent(null)} />
            ) : (
                <>
                    {events.length === 0 ? (
                        <div className="mt-4 border-l-4 border-purple-900 bg-purple-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <ExclamationTriangleIcon aria-hidden="true" className="h-5 w-5 text-purple-500" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-purple-700">
                                        There's no events available.{' '}
                                        <a href="/protected" className="font-medium text-purple-700 underline hover:text-purple-600">
                                            Please add/create new event to show here.
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (

                        <table className="min-w-auto divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-start text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                                    <th scope="col" className="px-3 py-3.5 text-start text-sm font-semibold text-gray-900">Description</th>
                                    <th scope="col" className="px-3 py-3.5 text-start text-sm font-semibold text-gray-900">Price</th>
                                    <th scope="col" className="px-3 py-3.5 text-start text-sm font-semibold text-gray-900">Location</th>
                                    <th scope="col" className="px-3 py-3.5 text-start text-sm font-semibold text-gray-900">Start Time</th>
                                    <th scope="col" className="px-3 py-3.5 text-start text-sm font-semibold text-gray-900">End Time</th>
                                    <th scope="col" className="px-3 py-3.5 text-start text-sm font-semibold text-gray-900">Category</th>
                                    <th scope="col" className="pr-3 py-3.5 text-start text-sm font-semibold text-gray-900">Capacity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {eventList.map((event) => (
                                    <tr key={event.id} className="relative hover:bg-gray-50">
                                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                                            <a href={`/event-details/${event.id}`} className="text-[#e2a242e1] hover:text-[#d6a354]">
                                                {event.title}
                                            </a>
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 break-words">{event.description}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">{event.price}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.location}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(event.start_time).toLocaleDateString()}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(event.end_time).toLocaleDateString()}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.category}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">{event.capacity}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div>
                                                    <MenuButton className="flex items-center rounded-full  text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#d6a354] focus:ring-offset-2 focus:ring-offset-gray-100">
                                                        <span className="sr-only">Open options</span>
                                                        <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
                                                    </MenuButton>
                                                </div>

                                                <MenuItems
                                                    transition
                                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <MenuItem>
                                                        {({ active }) => (
                                                            <button onClick={() => handleEdit(event)} className={`${active ? 'bg-gray-100' : ''} block  text-left px-4 w-full py-2 text-sm text-gray-700`}>
                                                                Edit
                                                            </button>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => handleDelete(event.id)}
                                                                className={`${active ? 'bg-gray-100' : ''
                                                                    } block w-full px-4 py-2 text-left text-sm text-gray-700`}>
                                                                Delete
                                                            </button>
                                                        )}
                                                    </MenuItem>
                                                </MenuItems>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
}
