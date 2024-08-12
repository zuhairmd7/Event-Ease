import { Resend } from "resend";
import { NextResponse } from "next/server";
import { EmailTemplate } from "../../../emailTemplate/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const { name, email, eventName, eventDate, eventLocation } = await request.json();

    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Event Registration Confirmation',
            react: EmailTemplate({
                firstName: name,
                /* eventName,
                eventDate: new Date(eventDate),
                eventLocation, */
            }),
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
