import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Calendar from "@/components/Calendar";
import CalendarIntro from "@/components/CalendarIntro";

export default async function AdminPanel() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <>
            <CalendarIntro />
            <Calendar />
        </>
    );
}