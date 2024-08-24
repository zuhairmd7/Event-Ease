import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface EditEventFormProps {
    event: any;
    onClose: () => void;
}

export default function EditEventForm({ event, onClose }: EditEventFormProps) {
    const [formData, setFormData] = useState(event);
    const supabase = createClient();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { error } = await supabase
                .from('events')
                .update(formData)
                .eq('id', event.id);

            if (error) {
                console.error('Error updating event:', error);
            } else {
                console.log('Event updated successfully');
                onClose();
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };


    return (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border-2 border-dashed border-purple-800">
            <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
                    <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                </div>

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
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
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
                <button type="submit" className="bg-purple-900 text-white font-bold flex justify-center text-center items-center px-3 py-2 rounded-md hover:bg-purple-700 mx-auto">
                    Update
                </button>
            </form>
        </div>
    );
}