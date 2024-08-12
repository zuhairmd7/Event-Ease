import { createClient } from '@/utils/supabase/server';
import BackButton from '@/components/BackButton';
import RegistrationForm from '@/components/RegestrationForm';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';

export default async function EventDetailsPage({ params }) {
    const { eventId } = params;
    const supabase = createClient();
    const currentDate = new Date().toISOString();

    const { data: event, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .gt('start_time', currentDate)
        .single();

    if (error) {
        console.error('Error fetching event:', error);
        return (
            <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg">
                <ExclamationTriangleIcon className="w-12 h-12 text-red-500" />
                <h2 className="font-bold text-2xl text-red-700 mb-4">Error loading event details</h2>
                <p className="text-gray-600 mb-6">The event could not be found or has already started.</p>
                <BackButton label="Go Back" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg">
                <ExclamationTriangleIcon className="w-12 h-12 text-red-500" />
                <h2 className="font-bold text-2xl text-red-700 mb-4">Event not found</h2>
                <p className="text-gray-600 mb-6">The event with the given ID does not exist or has already started.</p>
                <BackButton label="Go Back" />
            </div>
        );
    }

    return (
        <>
            <BackButton label="Go Back" />
            <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg">
                <h1 className="font-bold text-3xl text-purple-700 mb-4">{event.title} Event</h1>
                <p className="text-black mb-6">{event.description}</p>
                <div className="grid grid-cols-2 gap-4 text-gray-800">
                    <p className="bg-purple-100 p-3 rounded-lg shadow-md">Price: ${event.price}</p>
                    <p className="bg-purple-100 p-3 rounded-lg shadow-md">Location: {event.location}</p>
                    <p className="bg-purple-100 p-3 rounded-lg shadow-md">Start Time: {new Date(event.start_time).toLocaleString()}</p>
                    <p className="bg-purple-100 p-3 rounded-lg shadow-md">End Time: {new Date(event.end_time).toLocaleString()}</p>
                </div>
                <RegistrationForm eventId={event.id} eventName={event.title} eventDate={new Date(event.start_time).toLocaleString()} eventLocation={event.location} />
            </div>
        </>
    );
}
