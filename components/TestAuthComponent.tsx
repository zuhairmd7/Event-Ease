// components/TestAuthComponent.js
"use client"
import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase/client';

const TestAuthComponent = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();
                if (error) {
                    console.error("Error fetching user:", error);
                    setError(error.message);
                } else {
                    console.log("Fetched user data:", data.user); // Debugging
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                setError(error.message);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        console.log("Auth cookies:", document.cookie);
        console.log("Auth localStorage:", localStorage.getItem('supabase.auth.token'));
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return <div>Authenticated user: {JSON.stringify(user)}</div>;
};

export default TestAuthComponent;
