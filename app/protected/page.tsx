// path: app/protected/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import EventForm from "@/components/AddEventModal";
import EventList from "@/components/EventList"; // Import the EventList component

export default async function AdminPanel() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .eq('owner_id', user.id);

  if (error) {
    console.error("Error fetching events:", error);
    return <div>Error loading events</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-2 items-center">
      <div className="w-full">
        <div className="py-6 font-bold text-white bg-purple-950 text-center">
          Hello, This is a protected page that you can only see as an authenticated user
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-1 border-b-2 border-dashed border-violet-800">
        <h1 className="text-2xl md:text-4xl font-bold ">Welcome to, <span className="text-purple-950">Admin</span> Panel!</h1>
      </div>
      <div className="sm:flex lg:flex-row flex-col gap-1 w-full px-6">
        {/* Event Form Component */}
        <div className="bg-white p-6 rounded-md">
          <EventForm />
        </div>
        {/* Event List Component */}
        <div className="bg-white p-6 rounded-md">
          <EventList events={events} />
        </div>
      </div>
    </div>
  );
}