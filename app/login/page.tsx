import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import LoginLayout from "@/app/login/login-layout";

export default function Login({ searchParams, }: { searchParams: { message: string }; }) {
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

    return redirect("/");
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
      console.error('Sign-up error:', error.message);
      return redirect("/login?message=Could not authenticate user!");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <LoginLayout>
      <div className="flex flex-row w-full h-screen">

        <div className="w-1/2 h-full">
          <img src="/images/lk_wllness2.jpg" alt="login" className="w-full h-full object-cover rounded-r-3xl" />
        </div>

        <div className="flex flex-col w-1/2 px-8 sm:max-w-md justify-center mx-auto mt-8 gap-2">
          <form className="flex flex-col w-full justify-center gap-2 text-foreground">
            <div className="items-center flex justify-center mb-1">
              <Link href="/">
                <span className="bg-[#d8a75c] text-white px-1 font-bold text-3xl">EVENT</span>
                <span className="text-black font-bold ps-1 text-4xl">Now</span>
              </Link>
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
              className="bg-[#d8a75c] rounded-md px-4 py-2 text-foreground mb-2 text-white font-bold"
              pendingText="Signing In...">
              Sign In
            </SubmitButton>
            <div className="flex flex-row justify-center">
              Don't have an account ?{" "}
              <SubmitButton
                formAction={signUp}
                className="text-[#d8a75c] pl-1"
                pendingText="Signing Up...">
                Sign Up
              </SubmitButton>
            </div>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-[#d8a75c] text-black text-center">
                {searchParams.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </LoginLayout>
  );
}


{/* <Link href="/" className="absolute left-8 top-20 py-2 px-3 rounded-md no-underline bg-orange-600 text-white font-bold text-foreground  hover:bg-orange-700 flex items-center group text-sm ">
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
        <span className="transition-transform group-hover:-translate-x-1">Back</span>
      </Link> */}