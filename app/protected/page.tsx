import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import dynamic from 'next/dynamic';
import SearchEvents from "@/components/SearchEvents";

const EventManager = dynamic(() => import('@/components/EventManagment'), { ssr: false });

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold text-white bg-purple-950 text-center">
          Hello, This is a protected page that you can only see as an authenticated user
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-2">
        <h1 className="text-4xl font-bold">Welcome to, <span className="text-purple-950">Admin</span> Panel!</h1>
        <p>Admin panel content will be shown here.</p>
      </div>
      <EventManager />
      <SearchEvents label="Your Events"/>
    </div>
  );
}
