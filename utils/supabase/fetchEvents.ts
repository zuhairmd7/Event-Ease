//path: utils\supabase\fetchEvents.ts

import { createClient } from '@/utils/supabase/server';

export async function fetchEvents() {
    const supabase = createClient();
    const currentDate = new Date().toISOString();

    const { data, error } = await supabase.from('events').select('*').gt('start_time', currentDate);

    if (error) {
        console.error('Error fetching events:', error);
        return [];
    }
    return data;
}
