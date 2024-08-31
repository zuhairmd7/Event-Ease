"use client";
/*
import CalModal from '../../components/CalModal';
 */
import { createClient } from '@/utils/supabase/client';
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from 'date-fns'
import { useUser } from '@supabase/auth-helpers-react'; // Assuming you are using Supabase auth helpers
import { Fragment, use, useEffect, useState } from 'react'
import CalendarIntro from '@/components/CalendarIntro';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
    let [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            const supabase = createClient();

            let { data: events, error } = await supabase
                .from('events')
                .select('*')
                /* .eq('user_id', user.id) */
                .order('start_time', { ascending: true });

            if (error) {
                console.error('Error fetching events:', error);
                return;
            }

            setEvents(events);
        }

        fetchEvents();
    }, []);

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

    function previousMonth() {
        let firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
    const user = useUser(); // Get the current user

    let selectedDayMeetings = events.filter((event) =>
        isSameDay(parseISO(event.start_time), selectedDay)
    );

    return (

        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 mt-16">
            <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                <div className="md:pr-14">
                    <div className="flex items-center">
                        <h2 className="flex-auto text-lg font-bold text-[#dc8277]">
                            {format(firstDayCurrentMonth, 'MMMM yyyy')}
                        </h2>
                        <button
                            type="button"
                            onClick={previousMonth}
                            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Previous month</span>
                            <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                        </button>
                        <button
                            onClick={nextMonth}
                            type="button"
                            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    <div className="grid grid-cols-7 mt-2 text-sm">
                        {days.map((day, dayIdx) => (
                            <div
                                key={day.toString()}
                                className={classNames(
                                    dayIdx === 0 && colStartClasses[getDay(day)],
                                    'py-1.5'
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() => setSelectedDay(day)}
                                    className={classNames(
                                        isEqual(day, selectedDay) && 'text-white',
                                        !isEqual(day, selectedDay) &&
                                        isToday(day) &&
                                        'text-red-500',
                                        !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        isSameMonth(day, firstDayCurrentMonth) &&
                                        'text-gray-900',
                                        !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        !isSameMonth(day, firstDayCurrentMonth) &&
                                        'text-gray-400',
                                        isEqual(day, selectedDay) && isToday(day) && 'bg-[#e98a7f]',
                                        isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        'bg-gray-900',
                                        !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                        (isEqual(day, selectedDay) || isToday(day)) &&
                                        'font-semibold',
                                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                    )}
                                >
                                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                                        {format(day, 'd')}
                                    </time>
                                </button>

                                <div className="w-1 h-1 mx-auto mt-1">
                                    {events.some((event) =>
                                        isSameDay(parseISO(event.start_time), day)
                                    ) && (
                                            <div className="w-1 h-1 rounded-full bg-[#d6a354]"></div>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <section className="mt-12 md:mt-0 md:pl-14">
                    <h2 className="font-semibold text-gray-900">
                        Schedule for{' '}
                        <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                            {format(selectedDay, 'MMM dd, yyy')}
                        </time>
                    </h2>
                    <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                        {selectedDayMeetings.length > 0 ? (
                            selectedDayMeetings.map((event) => (
                                <Meeting event={event} key={event.id} />
                            ))
                        ) : (
                            <p>No meetings for today.</p>
                        )}
                    </ol>
                </section>
            </div>
        </div>
    )
}

function Meeting({ event }) {
    let startDateTime = parseISO(event.start_time)
    let endDateTime = parseISO(event.end_time)

    return (
        <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e98a7f" className="size-6">
                <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
            </svg>

            {/* alt="Event Photo" className="flex-none w-10 h-10 rounded-full" */}
            <div className="flex-auto">
                <p className="text-gray-900">{event.title}</p>
                <p className="mt-0.5">
                    <time dateTime={event.start_time}>
                        {format(startDateTime, 'h:mm a')}
                    </time>{' '}
                    -{' '}
                    <time dateTime={event.end_time}>
                        {format(endDateTime, 'h:mm a')}
                    </time>
                </p>
                <p className="text-gray-500">{event.location}</p>

            </div>
            {/* <Menu
                as="div"
                className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
            >
                <div>
                    <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon className="w-6 h-6" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Edit
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Cancel
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu> */}
        </li>
    )
}

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]