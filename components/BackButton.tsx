// components/BackButton.tsx

'use client'; // Ensure this component is treated as a client-side component

import { useRouter } from 'next/navigation';

interface BackButtonProps {
    label?: string; // Optional label prop
    className?: string; // Optional className prop for custom styling
}

const BackButton = ({ label = 'Back', className = '' }: BackButtonProps) => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className={`bg-purple-900 py-1 px-2 flex items-center text-center justify-center ml-3 my-3 rounded-md text-white font-bold transform transition-transform duration-300 hover:scale-105 hover:bg-purple-700 ${className}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="w-4 h-4 mr-1 fill-current text-white transition-transform duration-300 hover:ml-2">
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
            {label}
        </button>
    );
};

export default BackButton;
