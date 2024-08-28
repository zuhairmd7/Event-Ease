// layouts/login-layout.tsx
import { ReactNode } from "react";
import Head from "next/head";

type LayoutProps = {
    children: ReactNode;
};

export default function LoginLayout({ children }: LayoutProps) {
    return (
        <>
            <Head>
                <title>EventEase - Login</title>
            </Head>
            <main>{children}</main>
        </>
    );
}