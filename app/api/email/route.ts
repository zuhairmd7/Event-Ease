import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { name, email, eventTitle } = await request.json();

    // Create a transporter object using Gmail SMTP
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `"Zuhair Madmouj" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Registration Confirmed: ${eventTitle}`,
        html: `<p>Hi ${name},</p><p>You have successfully registered for the event: <strong>${eventTitle}</strong>.</p><p>We look forward to seeing you there!</p>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Email sent', info });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
    }
}
