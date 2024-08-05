'use client';

import React, { useState } from 'react';
import CreateEventForm from './CreateEventForm';

const EventManager = () => {
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleShowForm}
                className="bg-purple-900 text-white py-2 px-4 rounded-md font-bold hover:bg-purple-800"
            >
                Create New Event!
            </button>
            {showForm && <CreateEventForm onClose={handleCloseForm} />}
        </div>
    );
};

export default EventManager;
