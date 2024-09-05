/* // path: components\AuthButton.tsx
"use server"
import supabase from "@/utils/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = createClient();

  const {data: { user }} = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
  console.log("TESTT!!!!");
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4 text-black">
      {/* Hey, {user.email}! }
      <form action={signOut}>
        <button /* className="py-1 px-3 rounded-md no-underline text-white font-bold bg-purple-950 hover:bg-btn-background-hover" >
          Logout
        </button> 
      </form>
    </div>
  ) : (
    <Link href="/login" /* className="py-2 px-3 flex rounded-md no-underline bg-purple-950 hover:bg-btn-background-hover"  >Login</Link>
  );
} */



'use server'
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      {/* Hey, {user.email}! */}
      <form action={signOut}>
        <button className="flex px-4 py-2 w-48 text-sm hover:bg-gray-100 items-start left-0 text-red-700 data-[focus]:bg-gray-100" /* className="ms-3 py-1 px-1 flex text-sm rounded-md bg-purple-950 hover:cursor-pointer text-white font-semibold no-underline " */>
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login" className="block hover:bg-gray-100 w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
    /* className="ms-3 py-1 px-2 text-sm rounded-md bg-purple-950 text-white cursor-pointer font-semibold no-underline flex" */>
      Login
    </Link>
  );
}


