// path: app/api/delete-event.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from "@/utils/supabase/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { eventId } = req.body;

        if (!eventId) {
            return res.status(400).json({ error: 'Event ID is required' });
        }

        const supabase = createClient();
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', eventId);
        
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json({ message: 'Event deleted successfully' });
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }

}