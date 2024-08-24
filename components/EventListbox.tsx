import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';

const EventListbox = ({ events, selectedEvent, setSelectedEvent }) => {
    return (
        <Listbox value={selectedEvent} onChange={setSelectedEvent}>
            <Listbox.Button className="relative w-full cursor-default rounded-md h-9 bg-white py-1.5 pl-3 pr-10 text-left text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <span className="block truncate">{selectedEvent ? selectedEvent.category : 'Select an event'}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-purple-700" />
                </span>
            </Listbox.Button>

            <Listbox.Options
                transition
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm">
                <Listbox.Option
                    key="clear"
                    value={null}
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white">
                    <span className="block truncate font-normal group-data-[selected]:font-semibold">Clear Category</span>
                </Listbox.Option>
                {events.map((event) => (
                    <Listbox.Option
                        key={event.id}
                        value={event}
                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white">
                        <span className="block truncate font-normal group-data-[selected]:font-semibold">{event.category}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                            <CheckIcon aria-hidden="true" className="h-5 w-5" />
                        </span>
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
};

export default EventListbox;