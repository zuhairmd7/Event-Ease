// path: app/components/AddEventModal.tsx
"use client";

import { useState } from "react";

export default function EventForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 0,
        location: "",
        start_time: "",
        end_time: "",
        category: "",
        capacity: 10,
        is_online: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        /* const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => {
            const newFormData = {
                ...prevFormData,
                [name]: type === 'checkbox' ? checked : value,
            };
            if (name === 'is_online' && checked) {
                newFormData.location = 'online';
            } else if (name === 'is_online' && !checked) {
                newFormData.location = '';
            }
            return newFormData;
        }); */
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text(); // Use text() to get the response body as text
                console.error('Error creating event:', errorText);
                return;
            }

            // Optionally, handle successful form submission
            window.location.reload();
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (

        <div className="w-full max-w-md lg:-mt-32 mx-auto bg-white p-8 rounded-lg shadow-lg border-2 border-dashed border-[#d6a354]">
            <h2 className="text-2xl text-[#e98a7f] font-bold mb-4">Create New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
                    <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                </div>
                <div className="flex flex-row gap-2 justify-center">
                    <div className="flex flex-row gap-3 justify-center">
                        <div className="flex flex-col w-full">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                            <div className="relative rounded-md">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">₪</span>
                                </div>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder="0.00"
                                    value={formData.price} onChange={handleChange}
                                    aria-describedby="price-currency"
                                    className="block w-full rounded-md border-0 py-[9px] pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span id="price-currency" className="text-gray-500 sm:text-sm">ILS</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="location" className="text-sm font-medium text-gray-700">Location</label>
                        <input type="text" id="location" name="location" value={formData.location} /* value={formData.is_online ? 'online' : formData.location} */ onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="start_time" className="text-sm font-medium text-gray-700">Start Time</label>
                    <input type="datetime-local" id="start_time" name="start_time" value={formData.start_time} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="end_time" className="text-sm font-medium text-gray-700">End Time</label>
                    <input type="datetime-local" id="end_time" name="end_time" value={formData.end_time} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                </div>
                <div className="flex flex-row gap-2 justify-center">
                    <div className="flex flex-col w-full">
                        <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
                        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="capacity" className="text-sm font-medium text-gray-700">Capacity</label>
                        <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                    </div>
                </div>
                <fieldset>
                    <legend className="sr-only">Online</legend>
                    <div className="space-y-5">
                        <div className="relative flex items-start">
                            <div className="flex h-6 items-center">
                                <input
                                    id="online"
                                    name="online"
                                    type="checkbox"
                                    checked={formData.is_online}
                                    onChange={(e) => setFormData({ ...formData, is_online: e.target.checked })}
                                    aria-describedby="online-description"
                                    className="h-4 w-4 rounded border-gray-300 text-[#e98a7f] focus:ring-[#e98a7f]"
                                />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900" >
                                    Online Meeting
                                </label>
                                <p id="comments-description" className="text-gray-500">
                                    Get the zoom link on your email inbox for this event.
                                </p>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div className="w-full border border-gray-200 rounded-md opacity-55"></div>
                <button type="submit" className="bg-[#e98a7f] hover:bg-[#dc8277]      text-white font-bold flex justify-center text-center items-center px-7 py-2 rounded-md mx-auto">
                    Create
                </button>
            </form>
        </div>
    );
}
