import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Function to create a Zoom meeting
const createZoomMeeting = async (startTime: string, title: string) => {
    try {
        const response = await axios.post(
            'https://api.zoom.us/v2/users/me/meetings',
            {
                topic: title,
                type: 2, // Scheduled meeting
                start_time: startTime,
                duration: 60, // 1 hour duration, you can customize this
                timezone: 'UTC',
                settings: {
                    join_before_host: false,
                    mute_upon_entry: true,
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.ZOOM_OAUTH_TOKEN}`, // Replace with OAuth token if using OAuth
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating Zoom meeting:', error);
        throw error;
    }
};

// Next.js API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { startTime, title } = req.body;

        if (!startTime || !title) {
            return res.status(400).json({ message: 'Missing required fields: startTime, title' });
        }

        try {
            const zoomMeeting = await createZoomMeeting(startTime, title);
            return res.status(200).json(zoomMeeting);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to create Zoom meeting', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
