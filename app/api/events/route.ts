// path: app/api/events/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Handler for POST request
export async function POST(request: Request) {
    const supabase = createClient();
    const { title, description, price, location, is_online, start_time, end_time, category, capacity } = await request.json(); // Parse JSON data

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

    // Insert the new event into the database
    const { data, error } = await supabase
        .from("events")
        .insert([{ title, description, price, location, is_online, start_time, end_time, category, capacity }]);

    if (error) {
        console.error("Error creating event:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}