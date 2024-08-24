// pages/api/createZoomMeeting.ts
// this feature isn't available yet!

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' });
    }

    const { startTime, topic } = req.body;

    const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.ZOOM_JWT_TOKEN}`, // Or use OAuth token
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            topic,
            type: 2, // Scheduled meeting
            start_time: startTime,
            timezone: 'UTC',
            settings: {
                host_video: true,
                participant_video: true,
            }
        })
    });

    const data = await response.json();

    if (response.ok) {
        res.status(200).json({ join_url: data.join_url });
    } else {
        res.status(500).json({ message: 'Failed to create Zoom meeting' });
    }
}
