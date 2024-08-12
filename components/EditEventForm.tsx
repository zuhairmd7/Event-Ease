"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Adjust the import according to your project structure

type Event = {
    id: number;
    title: string;
    description: string;
    price: number;
    status: string;
    location: string;
    start_time: string;
    end_time: string;
    category: string;
    capacity: number;
};

type EditEventFormProps = {
    event: Event;
    onClose: () => void;
};

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
        <div className="w-full max-w-md -mt-32 bg-white p-8 rounded-lg shadow-lg border-2 border-dashed border-purple-800">
            <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields similar to EventForm but pre-filled with formData */}
                {/* ... */}
                <button type="submit" className="bg-purple-900 text-white font-bold flex justify-center text-center items-center px-3 py-2 rounded-md hover:bg-purple-700 mx-auto">
                    Update
                </button>
            </form>
        </div>
    );
}