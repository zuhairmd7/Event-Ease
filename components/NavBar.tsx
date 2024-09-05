//path: components\NavBar.tsx
import Link from 'next/link';
import React from 'react'
import EventLogo from './EventLogo';
import AuthButton from './AuthButton';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

export async function NavBar() {

    return (
        <Disclosure as="nav" className="bg-transparent">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-black  hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-950">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start gap-28">
                        <div className="flex flex-shrink-0 items-center">
                            <EventLogo />
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/" className="inline-flex items-center px-1 pt-1 text-sm font-bold text-gray-900">
                                Home
                            </Link>
                            <Link href="/event-details" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-bold text-black hover:border-gray-300 hover:text-gray-700">
                                Upcoming Events
                            </Link>
                            <Link href="/protected" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-bold text-black hover:border-gray-300 hover:text-gray-700">
                                Admin Panel
                            </Link>
                            <Link href="/calendar" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-bold text-black hover:border-gray-300 hover:text-gray-700">
                                Calendar
                            </Link>
                        </div>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Notifecation button */}
                        <button type="button" className="relative rounded-full  p-1 text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-950 focus:ring-offset-2">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-900 focus:ring-offset-2">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="h-8 w-8 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                                <MenuItem>
                                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Your Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Settings
                                    </Link>
                                </MenuItem>
                                <MenuItem as="div">
                                    <AuthButton />
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 pb-4 pt-2">
                    <DisclosureButton
                        as="a"
                        href="/"
                        className="block border-l-4 border-[#dc8277] bg-[#fff7f6] py-2 pl-3 pr-4 text-base font-medium text-[#dc8277]">
                        Home
                    </DisclosureButton>
                    <DisclosureButton
                        as="a"
                        href="/event-details"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-black hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
                        Event Details
                    </DisclosureButton>
                    <DisclosureButton
                        as="a"
                        href="/registration"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-black hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
                        Regestration
                    </DisclosureButton>
                    <DisclosureButton
                        as="a"
                        href="/protected"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-black hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
                        Admin Panel
                    </DisclosureButton>
                    <DisclosureButton
                        as="a"
                        href="/calendar"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-black hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
                        Calendar
                    </DisclosureButton>
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}
export default NavBar;
