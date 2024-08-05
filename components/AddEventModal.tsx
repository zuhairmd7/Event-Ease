//path: components\AddEventModal.tsx

/* 'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function AddEventModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        status: '',
        location: '',
        start_time: '',
        end_time: '',
        category: '',
        capacity: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('events')
            .insert([formData]);

        if (error) {
            console.error('Error inserting event:', error);
        } else {
            console.log('Event inserted:', data);
            onClose(); // Close the modal after successful submission
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Event</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Status</label>
                        <input
                            type="text"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Start Time</label>
                        <input
                            type="datetime-local"
                            name="start_time"
                            value={ formData.start_time }
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">End Time</label>
                        <input
                            type="datetime-local"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Capacity</label>
                        <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required/>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-4 py-2 px-4 bg-gray-500 text-white rounded">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-purple-950 text-white rounded">
                            Add Event
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
 */