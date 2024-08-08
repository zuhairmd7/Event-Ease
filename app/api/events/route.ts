// path: app/api/events/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Handler for POST request
export async function POST(request: Request) {
    const supabase = createClient();
    const { title, description, price, status, location, start_time, end_time, category, capacity } = await request.json(); // Parse JSON data

    // Validate input if necessary
    if (!title || !description || !price || !status || !location || !start_time || !end_time || !category || !capacity) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Insert the new event into the database
    const { data, error } = await supabase
        .from("events")
        .insert([{ title, description, price, status, location, start_time, end_time, category, capacity }]);

    if (error) {
        console.error("Error creating event:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}
