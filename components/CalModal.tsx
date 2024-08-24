import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

const AddEventModal = ({ isOpen, closeModal }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        start_time: '',
        end_time: '',
        category: '',
        capacity: 10,
        is_online: false,
        price: 0,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleOnlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            is_online: checked,
            location: checked ? 'Online' : prevState.location
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const eventData = {
            ...formData,
            location: formData.is_online ? 'online' : formData.location,
        };

        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error creating event:', errorText);
                return;
            }

            const data = await response.json();
            console.log('Event created:', data);
            closeModal();

        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between items-center">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Add Event
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-500"
                                        onClick={closeModal}
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg
                                            className="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="flex flex-col">
                                            <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
                                            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
                                            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="location" className="text-sm font-medium text-gray-700">Location</label>
                                            <input
                                                type="text"
                                                id="location"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                                required={!formData.is_online}
                                                disabled={formData.is_online}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="start_time" className="text-sm font-medium text-gray-700">Start Time</label>
                                            <input
                                                type="datetime-local"
                                                id="start_time"
                                                name="start_time"
                                                value={formData.start_time}
                                                onChange={handleChange}
                                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="end_time" className="text-sm font-medium text-gray-700">End Time</label>
                                            <input
                                                type="datetime-local"
                                                id="end_time"
                                                name="end_time"
                                                value={formData.end_time}
                                                onChange={handleChange}
                                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-row gap-2 justify-center">
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
                                                <input
                                                    type="text"
                                                    id="category"
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                                            <div className="relative rounded-md">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <span className="text-gray-500 sm:text-sm">₪</span>
                                                </div>
                                                <input
                                                    type="number"
                                                    id="price"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full pl-8"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <label htmlFor="capacity" className="text-sm font-medium text-gray-700">Capacity</label>
                                            <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                                        </div>
                                        <fieldset>
                                            <legend className="sr-only">Online</legend>
                                            <div className="space-y-5">
                                                <div className="relative flex items-start">
                                                    <div className="flex h-6 items-center">
                                                        <input
                                                            id="online"
                                                            name="is_online"
                                                            type="checkbox"
                                                            checked={formData.is_online}
                                                            onChange={handleOnlineChange}
                                                            aria-describedby="online-description"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm leading-6">
                                                        <label htmlFor="online" className="font-medium text-gray-900">
                                                            Online Meeting
                                                        </label>
                                                        <p id="online-description" className="text-gray-500">
                                                            Get the zoom link on your email inbox for this event.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>

                                        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-md">Create Event</button>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AddEventModal;