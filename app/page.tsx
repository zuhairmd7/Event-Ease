'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Caveat } from 'next/font/google';

/* const links = [
    { name: 'Open roles', href: '#' },
    { name: 'Internship program', href: '#' },
    { name: 'Our values', href: '#' },
    { name: 'Meet our leadership', href: '#' },
] */
const caveat = Caveat({
    weight: ['400', '700'], // Choose the appropriate weights
    subsets: ['latin'],
});
const stats = [
    { name: 'Online availability', value: 'Available' },
    { name: 'Active Organizers', value: '300+' },
    { name: 'Event per week', value: 'Unlimited' },
    { name: 'Customer Satisfaction', value: '98%' },
]
export default function Home() {
    useEffect(() => {
        AOS.init();
    }, []);

    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error subscribing:', errorText);
                return;
            }

            // Optionally, handle successful subscription
            alert("Subscribed successfully!");
            setEmail("");
        } catch (error) {
            console.error('Error subscribing:', error);
        }
    };

    return (
        <>
            <div className="bg-white max-h-screen">
                <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
                    <div aria-hidden="true" className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96" />
                    <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8" >
                        <div className="mx-auto max-w-2xl -mt-32 lg:mx-0 lg:-mt-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8" >
                            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto" data-aos="fade-right">
                                We’re changing the way people make events !
                            </h1>
                            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1" >
                                <p className="text-lg leading-8 text-gray-600">
                                    Discover, manage, and track your events seamlessly. Join our community to effortlessly organize and keep up with your events, all in one place.
                                </p>

                                <div className="mt-10  flex items-center gap-x-6">
                                    <Link
                                        href="/protected"
                                        className="rounded-md bg-[#d6a456] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#a77628] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        Get started
                                    </Link>
                                    <Link href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                        Learn more
                                    </Link>
                                </div>
                            </div>
                            <img
                                data-aos="fade-up-left"
                                alt=""
                                src="https://images.unsplash.com/photo-1595877786670-393ef0ac0961?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                            />
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
                    <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-white sm:h-32" />
                </div>
            </div>

            <div className="relative">
                <svg className="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 310" style={{ transform: 'rotate(180deg)' }}>
                    <path fill="#dc8277" fillOpacity="1" d="M0,160L60,154.7C120,149,240,139,360,133.3C480,128,600,128,720,154.7C840,181,960,235,1080,250.7C1200,267,1320,245,1380,234.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                </svg>

                <svg className="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 310">
                    <path fill="#dc8277" fillOpacity="1" d="M0,160L60,154.7C120,149,240,139,360,133.3C480,128,600,128,720,154.7C840,181,960,235,1080,250.7C1200,267,1320,245,1380,234.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                </svg>


                <div className="flex flex-col md:flex-row -mt-28 items-center justify-center h-screen md:-mt-48 space-y-8 md:space-y-0 md:space-x-16 px-4">
                    <img
                        data-aos="fade-right"
                        src="/images/1672075074734.jpg"
                        alt="LK Wellness Services Team"
                        className="w-full max-w-sm md:max-w-2xl rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
                    />

                    <div className="text-center text-gray-800" data-aos="zoom-out">
                        <h1 className={`${caveat.className} text-3xl md:text-[3.5rem] text-[#82b5b9] font-bold`}>
                            Making Life Easier for the LK Wellness Team
                        </h1>
                        <p className="mt-4 max-w-md md:max-w-lg mx-auto text-base md:text-lg">
                            Our event management project streamlines scheduling, event tracking, and communication, allowing the LK Wellness Team to focus on what they do best—caring for their clients.
                        </p>
                    </div>
                </div>
            </div>





            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
                />
                <div
                    aria-hidden="true"
                    className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                    />
                </div>
                <div
                    aria-hidden="true"
                    className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                    />
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl" data-aos="zoom-out">Effortlessly Manage Your Events</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            From planning to execution, our platform ensures a seamless experience. Whether it’s a conference, workshop, or celebration, we provide the tools you need to make every event a success.
                        </p>
                    </div>
                    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                        {/* <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                            {links.map((link) => (
                                <a key={link.name} href={link.href}>
                                    {link.name} <span aria-hidden="true">&rarr;</span>
                                </a>
                            ))}
                        </div> */}
                        <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4" data-aos="zoom-out">
                            {stats.map((stat) => (
                                <div key={stat.name} className="flex flex-col-reverse">
                                    <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>


            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                        Trusted By - Our Partners
                    </h2>
                    <div data-aos="flip-down" className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        <img
                            alt="Transistor"
                            src="/images/Birzeit-University-BZU-logo.png"
                            width={158}
                            height={48}
                            className="col-span-2 size-36 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="Reform"
                            src="/images/LoveandKindness.png"

                            className="col-span-2 size-36 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="Tuple"
                            src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="SavvyCal"
                            src="/images/NNU_Logo.webp"
                            width={158}
                            height={48}
                            className="col-span-2 size-36 w-full object-contain sm:col-start-2 lg:col-span-1"
                        />
                        <img
                            alt="Statamic"
                            src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                            width={158}
                            height={48}
                            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white py-16 sm:py-24" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
                        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Stay Updated on Our Latest Events !
                        </h2>
                        <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
                            Don’t miss out on any upcoming events or updates. write your email and be the first to know what’s happening.
                        </p>
                        <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-md gap-x-4">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                            />
                            <button
                                type="submit"
                                className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                                Notify me
                            </button>
                        </form>
                        <svg
                            viewBox="0 0 1024 1024"
                            aria-hidden="true"
                            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
                        >
                            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                            <defs>
                                <radialGradient
                                    r={1}
                                    cx={0}
                                    cy={0}
                                    id="759c1415-0410-454c-8f7c-9a820de03641"
                                    gradientUnits="userSpaceOnUse"
                                    gradientTransform="translate(512 512) rotate(90) scale(512)"
                                >
                                    <stop stopColor="#7775D6" />
                                    <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>

            <section className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20" data-aos="fade-right">
                            <img alt="" src="https://tailwindui.com/img/logos/tuple-logo-gray-900.svg" className="h-12 self-start" />
                            <figure className="mt-10 flex flex-auto flex-col justify-between">
                                <blockquote className="text-lg font-bold leading-8 text-gray-900" >
                                    <p>
                                        “As a small business owner, I needed an efficient way to manage multiple events simultaneously, and EventNow has been a game-changer. The ability to customize event pages, track registrations, and handle payments all in one place has simplified my workflow. The support team is also fantastic—they’re always there when I need help.”
                                    </p>
                                </blockquote>
                                <figcaption className="mt-10 flex items-center gap-x-6">
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="h-14 w-14 rounded-full bg-gray-50"
                                    />
                                    <div className="text-base">
                                        <div className="font-semibold text-gray-900">Judith Black</div>
                                        <div className="mt-1 text-gray-500">CEO of Tuple</div>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                        <div className="flex flex-col border-t border-gray-900/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20" >
                            <div data-aos="fade-left">
                                <img alt="" src="/images/Spotify_Logo.png" className="h-10 self-start" />
                                <figure className="mt-10 flex flex-auto flex-col justify-between" >
                                    <blockquote className=" text-lg font-bold leading-8 text-gray-900" >
                                        <p>
                                            “EventNow has completely transformed the way we manage our events. The platform is incredibly intuitive and makes it easy to organize everything from start to finish. The real-time updates and seamless communication features have saved us so much time and effort. We couldn't be happier with the results!”
                                        </p>
                                    </blockquote>
                                    <figcaption className="mt-10 flex items-center gap-x-6">
                                        <img
                                            alt=""
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            className="h-14 w-14 rounded-full bg-gray-50"
                                        />
                                        <div className="text-base">
                                            <div className="font-semibold text-gray-900">Daniel Ek</div>
                                            <div className="mt-1 text-gray-500">CEO of spotify</div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}