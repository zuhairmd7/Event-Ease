/* // components/ConditionalNavbar.tsx

"use client"; // Mark this as a Client Component

import { usePathname } from 'next/navigation';
import NavBar from '@/components/NavBar';

export default function ConditionalNavbar() {
    const pathname = usePathname(); // Get the current route

    const noNavbarRoutes = ['/login']; // Routes without Navbar

    return !noNavbarRoutes.includes(pathname) ? <NavBar /> : null;

}
 */

// components/ConditionalNavbar.tsx (Client Component)

"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavBar from './NavBar';

export default function ConditionalNavbar() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Example logic without async/await
        if (pathname === '/login' || pathname === '/signup') {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [pathname]);

    return isVisible ? <NavBar /> : null;
}