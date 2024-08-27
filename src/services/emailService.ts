import nodemailer from 'nodemailer';
import { db } from '../config/db';
import { RowDataPacket } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Configure the email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.ionos.co.uk',
    port: 587,
    secure: false,
    auth: {
        user: process.env.IONOS_EMAIL,
        pass: process.env.IONOS_PASSWORD,
    },
});

// Function to send an email notification
export async function sendEmailNotification(certificates: any[]) {
    const emailText = certificates.map(
        cert => `Certificate: ${cert.certificateName}, Expiry Date: ${cert.expireDate}, House: ${cert.houseName}`
    ).join('\n');

    try {
        await transporter.sendMail({
            from: '"Certificate Alert" <info@realanthonyestate.co.uk>', // Sender address
            to: 'ortale22@gmail.com', // List of recipients,
            cc: certificates.map(cert => cert.email),
            subject: 'Certificates Expiring Soon', // Subject line
            text: `The following certificates are expiring soon:\n\n${emailText}`, // Plain text body
        });

        updateSentEmail(certificates.map(cert => cert.id));
    } catch(error) {
        console.error('Error sending email:', error);
    }

    console.log('Notification email sent.');
}

async function updateSentEmail(id: any[]) {
    const [rows] = await db.query<RowDataPacket[]>(`
        UPDATE certificates SET emailSent = 1 WHERE id IN (${id})
    `);

    if (rows.length > 0) {
        console.log(`Found ${rows.length} certificates expiring within the next month:`);

        // Send an email notification
        await sendEmailNotification(rows);

    } else {
        console.log('No certificates expiring within the next month.');
    }
}
