import React from 'react';

const ComingSoonPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
            <p className="text-lg text-gray-600 mb-8">We're working hard to bring you an amazing experience.</p>
            <div className="flex space-x-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Notify Me
                </button>
            </div>
        </div>
    );
};

export default ComingSoonPage;