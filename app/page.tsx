import { createClient } from '@/utils/supabase/server';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import TestAuthComponent from '@/components/TestAuthComponent';

/* async function fetchEvents() {
    const supabase = createClient();
    const currentDate = new Date().toISOString();

    const { data, error } = await supabase.from('events').select('*').gt('start_time', currentDate);

    if (error) {
        console.error('Error fetching events:', error);
        return [];
    }
    return data;
}
 */
export default async function Home() {
    /*     const events = await fetchEvents();
     */
    return (
        <div className="px-4 sm:px-6 lg:px-8 w-2/3 mx-auto mt-32">
        Hello world !
        <TestAuthComponent/>
        </div>
    );
}