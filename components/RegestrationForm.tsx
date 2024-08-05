'use client';

import { useState } from 'react';
import Dialog from './Dialog';

const RegistrationForm = ({ eventId }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsDialogOpen(true)}
                className="mt-16 font-bold bg-purple-700 text-white p-2 rounded hover:bg-purple-900">
                Register for this Event
            </button>
            <Dialog isOpen={isDialogOpen} closeModal={() => setIsDialogOpen(false)}>
                {/* Registration form content */}
                <form>
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
                            placeholder="Your Name"/>
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
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                            Register
                        </button>
                        <button
                            className="text-red-500 hover:text-red-700 text-sm"
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
