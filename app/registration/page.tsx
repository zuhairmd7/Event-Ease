"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '@supabase/auth-helpers-react';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const Registrations = () => {
    const user = useUser();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchMyEventsWithRegistrations = async () => {
            if (!user) return;

            // Fetch events created by the logged-in user
            const { data: events, error: eventError } = await supabase
                .from('events')
                .select('id, title')
                .eq('owner_id', user.id);

            if (eventError) {
                console.error('Error fetching events:', eventError);
                return;
            }

            // Fetch registrations for those events
            const { data: registrations, error: registrationError } = await supabase
                .from('registrations')
                .select('event_id, attendent_name, email')
                .in('event_id', events.map((event) => event.id));

            if (registrationError) {
                console.error('Error fetching registrations:', registrationError);
                return;
            }

            // Combine events with their corresponding registrations
            const eventsWithRegistrations = events.map((event) => ({
                ...event,
                registrations: registrations.filter((reg) => reg.event_id === event.id),
            }));

            setEvents(eventsWithRegistrations);
        };

        fetchMyEventsWithRegistrations();
    }, [user]);

    if (!user) {
        return <p>Please log in to see your registrations.</p>;
    }

    return (
        <div>
            <h1>My Event Registrations</h1>
            {events.length > 0 ? (
                events.map((event) => (
                    <div key={event.id}>
                        <h2>{event.title}</h2>
                        {event.registrations.length > 0 ? (
                            <ul>
                                {event.registrations.map((registration, index) => (
                                    <li key={index}>
                                        <p>Attendant Name: {registration.attendent_name}</p>
                                        <p>Email: {registration.email}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No registrations for this event.</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No events created by you.</p>
            )}
        </div>
    );
};

export default Registrations;
