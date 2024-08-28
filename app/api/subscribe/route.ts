// path: app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
    const supabase = createClient();
    const { email } = await request.json(); // Parse the incoming request JSON

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Insert the new subscriber into the subscribers table
    const { data, error } = await supabase
        .from("subscribers")
        .insert([{ email }]);

    if (error) {
        console.error("Error subscribing:", error);
        return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ message: "Subscribed successfully!" }, { status: 200 });
}
