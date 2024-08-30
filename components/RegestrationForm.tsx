'use client';

import { useState } from 'react';
import Dialog from './Dialog';
import { createClient } from '@/utils/supabase/client';

const RegistrationForm = ({ eventId, eventName, eventDate, eventLocation }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const supabase = createClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from('registrations')
            .insert([{ event_id: eventId, attendant_name: name, email }]);

        setLoading(false);

        if (error) {
            setError(error.message);
        } else {

            setIsDialogOpen(false);
            setName('');
            setEmail('');
            alert('Registration successful!');

            await fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, eventTitle: eventName, eventDate, eventLocation }),
            });
        }
    };
    return (
        <>
            <button
                onClick={() => setIsDialogOpen(true)}
                className="mt-16 font-bold bg-[#d6a456] text-white p-2 rounded hover:bg-purple-900">
                Register for this Event
            </button>
            <Dialog isOpen={isDialogOpen} closeModal={() => setIsDialogOpen(false)}>
                {/* Registration form content */}
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4">Register for Event</h2>
                    <input type="hidden" name="event_id" value={eventId} />
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                        <button
                            className="text-black hover:text-red-700 text-sm"
                            onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </Dialog>
        </>
    );
};
export default RegistrationForm;