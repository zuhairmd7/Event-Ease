import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import EventLogo from "../../components/EventLogo";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user!");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className=" flex flex-col w-full px-8 sm:max-w-md justify-center mx-auto mt-32 gap-2">
      <Link
        href="/"
        className="absolute left-8 top-20 py-2 px-4 rounded-md no-underline bg-orange-600 text-white font-bold text-foreground  hover:bg-orange-700 flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form className="flex flex-col w-full justify-center gap-2 text-foreground">
        <div className="items-center flex justify-center mb-1">
          <span className="bg-orange-600 text-white px-1 font-bold text-3xl">EVENT</span>
          <span className="text-black font-bold ps-1 text-4xl">Now</span>
        </div>
        <h1 className="mb-4 text-black font-bold text-center">Log in to manage your events and track registrations effortlessly</h1>
        <label className="text-md text-black font-bold" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit text-black border border-gray-500 mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md text-black font-bold" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 text-black bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="bg-orange-600 rounded-md px-4 py-2 text-foreground mb-2 text-white font-bold"
          pendingText="Signing In...">
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className="border border-orange-600 rounded-md px-4 py-2 text-orange-600 mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-orange-600 text-white text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
