import * as React from 'react';

interface EmailTemplateProps {
    Name: string;
    eventLocation: string;
    eventName: string;
    eventDate: Date;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ Name, eventDate, eventLocation, eventName }) => (
    <div>
        <h1>Welcome, {Name}!</h1>
    </div>
);
