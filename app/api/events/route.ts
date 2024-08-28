// path: app/api/events/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import createZoomMeeting from "@/app/api/zoom/createZoomMeeting";
import nodemailer from "nodemailer";

interface ZoomMeeting {
    join_url: string;
}

// Handler for POST request
export async function POST(request: Request) {
    const supabase = createClient();
    const { title, description, price, location, is_online, start_time, end_time, category, capacity, organizer_email } = await request.json(); // Parse JSON data

    // Validate input and accumulate missing fields
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!description) missingFields.push("description");
    if (!price) missingFields.push("price");
    if (!is_online && !location) missingFields.push("location"); // Only check location if the event is not online
    if (!start_time) missingFields.push("start_time");
    if (!end_time) missingFields.push("end_time");
    if (!category) missingFields.push("category");
    if (!capacity) missingFields.push("capacity");

    if (missingFields.length > 0) {
        return NextResponse.json({ error: "Missing fields", fields: missingFields }, { status: 400 });
    }

    let zoomLink: string | null = null;

    // Create a Zoom meeting for the event if it is online
    /* if (is_online) {
        try {
            const zoomMeeting = await createZoomMeeting(start_time, title);
            zoomLink = zoomMeeting.join_url;
        } catch (zoomError) {
            console.error("Error creating Zoom meeting:", zoomError);
            return NextResponse.json({ error: zoomError.message }, { status: 500 });
        }
    } */

    // Insert the new event into the database
    const { data, error } = await supabase
        .from("events")
        .insert([{ title, description, price, location, is_online, start_time, end_time, category, capacity,/*  zoom_link: zoomLink */ }])
        .select(); // Return the inserted data

    if (error) {
        console.error("Error creating event:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Setup Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // Prepare the organizer's email content
    /* const organizerMailOptions = {
        from: process.env.SMTP_USER,
        to: organizer_email, // Organizer's email address
        subject: "Event Created Successfully",
        text: `Your event "${title}" has been created successfully!${is_online ? `\n\nJoin Zoom Meeting: ${zoomLink}` : ''}`,
    };

    // Send the email to the organizer
    try {
        await transporter.sendMail(organizerMailOptions);
    } catch (emailError) {
        console.error("Error sending email to organizer:", emailError);
        return NextResponse.json({ error: "Event created, but failed to send email to organizer." }, { status: 500 });
    }
 */
    // Fetch subscribers' emails
    const { data: subscribers, error: subscribersError } = await supabase
        .from("subscribers")
        .select("email");

    if (subscribersError) {
        console.error("Error fetching subscribers:", subscribersError);
        return NextResponse.json({ error: "Event created, but failed to fetch subscribers." }, { status: 500 });
    }

    // Notify all subscribers about the new event
    const subscriberEmails = subscribers.map((subscriber: { email: string }) => subscriber.email);

    const subscriberMailOptions = {
        from: process.env.GMAIL_USER,
        bcc: subscriberEmails, // Send BCC to all subscribers
        subject: "New Event Added!",
        text: `A new event "${title}" has been added if you are intrested !! ${is_online ? `\n\nJoin Zoom Meeting: ${zoomLink}` : ''}\n\nDescription: ${description}\n\nCategory: ${category}\n\nLocation: ${location}\n\nStart Time: ${start_time}\n\nEnd Time: ${end_time}\n\nCapacity: ${capacity}`,
    };

    // Send the email to subscribers
    try {
        await transporter.sendMail(subscriberMailOptions);
    } catch (subscriberEmailError) {
        console.error("Error sending email to subscribers:", subscriberEmailError);
        return NextResponse.json({ error: "Event created, but failed to send email to subscribers." }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}














































// import { NextResponse } from "next/server";
// import { createClient } from "@/utils/supabase/server";
// import createZoomMeeting from "@/app/api/zoom/createZoomMeeting";

// interface ZoomMeeting {
//     join_url: string;
// }

// // Handler for POST request
// export async function POST(request: Request) {
//     const supabase = createClient();
//     const { title, description, price, location, is_online, start_time, end_time, category, capacity } = await request.json(); // Parse JSON data

//     // Validate input and accumulate missing fields
//     const missingFields = [];
//     if (!title) missingFields.push("title");
//     if (!description) missingFields.push("description");
//     if (!price) missingFields.push("price");
//     if (!is_online && !location) missingFields.push("location"); // Only check location if the event is not online
//     if (!start_time) missingFields.push("start_time");
//     if (!end_time) missingFields.push("end_time");
//     if (!category) missingFields.push("category");
//     if (!capacity) missingFields.push("capacity");

//     if (missingFields.length > 0) {
//         return NextResponse.json({ error: "Missing fields", fields: missingFields }, { status: 400 });
//     }

//     // Insert the new event into the database
//     const { data, error } = await supabase
//         .from("events")
//         .insert([{ title, description, price, location, is_online, start_time, end_time, category, capacity }]);
//     /* 
//         let zoomLink: string;
    
//         // Create a Zoom meeting for the event
//         if (is_online) {
//             try {
//                 const zoomMeeting = await createZoomMeeting(start_time, title);
//                 zoomLink = zoomMeeting.join_url;
//             } catch (zoomError) {
//                 console.error("Error creating Zoom meeting:", zoomError);
//                 return NextResponse.json({ error: zoomError.message }, { status: 500 });
//             }
//         } */
//     if (error) {
//         console.error("Error creating event:", error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }



//     return NextResponse.json(data, { status: 201 });
// }