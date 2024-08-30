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
        /*.gt('start_time', currentDate)*/
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

    const { data: registrations, error: registrationsError } = await supabase
        .from('registrations')
        .select('id, attendant_name, email')
        .eq('event_id', eventId);

    if (registrationsError) {
        console.error('Error fetching registrations:', registrationsError);
    }

    return (
        <>
            <BackButton label="Go Back" />
            <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg">
                <h1 className="font-bold text-3xl text-[#dc8277] mb-4">{event.title} Event</h1>
                <p className="text-black mb-6">{event.description}</p>
                <div className="grid grid-cols-2 gap-6 text-gray-800">
                    <div className="border border-[#dc8277] rounded-lg px-10 py-3 relative">
                        <span className="absolute -top-4 left-4 bg-white px-3 text-black font-semibold">Price</span>
                        <p className="text-black text-xl">₪{event.price}</p>
                    </div>
                    <div className="border border-[#dc8277] rounded-lg px-10 py-4 relative">
                        <span className="absolute -top-4 left-4 bg-white px-3 text-black font-semibold">Location</span>
                        <p className="text-black">{event.location}</p>
                    </div>
                    <div className="border border-[#dc8277] rounded-lg px-10 py-4 relative">
                        <span className="absolute -top-4 left-4 bg-white px-3 text-black font-semibold">Start Time</span>
                        <p className="text-black">{new Date(event.start_time).toLocaleString()}</p>
                    </div>
                    <div className="border border-[#dc8277] rounded-lg px-10 py-4 relative">
                        <span className="absolute -top-4 left-4 bg-white px-3 text-black font-semibold">End Time</span>
                        <p className="text-black">{new Date(event.end_time).toLocaleString()}</p>
                    </div>
                </div>
                <RegistrationForm eventId={event.id} eventName={event.title} eventDate={new Date(event.start_time).toLocaleString()} eventLocation={event.location} />

                {registrations?.length > 0 ? (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold text-[#dc8277] mb-4">Registered Users:</h2>
                        <div className="space-y-2">
                            {registrations.map((registration) => (
                                <div key={registration.id} className="flex items-center text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#d6a456" className="w-6 h-6 mr-2 text-purple-700">
                                        <path fillRule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                    </svg>
                                    {registration.attendant_name} ({registration.email})
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600 mt-6">No users have registered for this event yet.</p>
                )}
            </div>

        </>
    );
}