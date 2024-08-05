'use client';

import { Dialog as HeadlessDialog } from '@headlessui/react';

const Dialog = ({ isOpen, closeModal, children }) => {
    return (
        <HeadlessDialog open={isOpen} onClose={closeModal} className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-black opacity-30"></div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6">
                    {children}
                </div>
            </div>
        </HeadlessDialog>
    );
};

export default Dialog;
