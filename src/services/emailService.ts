import nodemailer from 'nodemailer';
import { db } from '../config/db';
import { RowDataPacket } from 'mysql2/promise';
import dotenv from 'dotenv';
import moment from 'moment';

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
export async function sendCertificateEmailNotification(certificates: any[]) {
    const emailText = certificates.map(
        cert => `Certificate: ${cert.certificateName}, Expiry Date: ${moment(cert.expireDate).format('DD/MM/YYYY')}, House: ${cert.houseName}`
    ).join('\n');

    try {
        await transporter.sendMail({
            from: '"Certificate Alert" <info@realanthonyestate.co.uk>', // Sender address
            to: process.env.IONOS_EMAIL, // List of recipients,
            cc: certificates.map(cert => cert.email),
            subject: 'Certificates Expiring Soon', // Subject line
            text: `The following certificates are expiring soon:\n\n${emailText}`, // Plain text body
        });

        updateCertificatesSentEmail(certificates.map(cert => cert.id));
    } catch(error) {
        console.error('Error sending email:', error);
    }

    console.log('Notification email sent.');
}

// Function to send an email notification

export async function sendDueInvoiceEmailNotification(payments: any[]) {
    const emailText = payments.map(
        payment => `House: ${payment.houseName}, Fee Amount: ${payment.feeAmount}, Due Date: ${moment(payment.dueDate).format('DD/MM/YYYY')}`
    ).join('\n');

    const subjectText = payments.map(
        payment => `${payment.houseName}`
    );

    try {
        await transporter.sendMail({
            from: '"Real Anthony Estate" <info@realanthonyestate.co.uk>', // Sender address
            to: process.env.IONOS_EMAIL, // List of recipients,
            cc: payments.map(payment => payment.email),
            subject: `${subjectText} - Rent Reminder Alert`, // Subject line
            text: `Dear Customer\n\nThis is a reminder that the rent for this property is due on today. Please keep me informed of any delays on receiving the balance so I can contact the tenants.\n\nKind Regards,`, // Plain text body
        });

        updateDueInvoicesSentEmail(payments.map(payment => payment.id));
    } catch(error) {
        console.error('Error sending email:', error);
    }
    console.log('Notification email sent.');

}

// Function to send an email notification
export async function sendExpContractEmailNotification(contracts: any[]) {
    const emailText = contracts.map(
        contract => `House: ${contract.name}, Expiry Date: ${moment(contract.astExpDate).format('DD/MM/YYYY')}`
    ).join('\n');

    try {
        await transporter.sendMail({
            from: '"Expiring Contract Alert" <info@realanthonyestate.co.uk>', // Sender address
            to: process.env.IONOS_EMAIL, // List of recipients,
            cc: contracts.map(cert => cert.email),
            subject: 'Contracts Expiring Soon', // Subject line
            text: `The following AST contracts are expiring soon:\n\n${emailText}`, // Plain text body
        });

        updateContractsSentEmail(contracts.map(contract => contract.id));
    } catch(error) {
        console.error('Error sending email:', error);
    }

    console.log('Notification email sent.');
}

// Function to send an email notification
export async function sendContactFromWebsite(contactForm: any) {
    const { name, email, message } = contactForm;

    try {
        await transporter.sendMail({
            from: `"Website - Contact" ${email}>`, // Sender address
            to: process.env.IONOS_EMAIL, // List of recipients,
            subject: `Contact from Mr(s) ${name}`, // Subject line
            text: message, // Plain text body
        });
    } catch(error) {
        console.error('Error sending email:', error);
    }

    console.log('Notification email sent.');
}

async function updateCertificatesSentEmail(id: any[]) {
    const [rows] = await db.query<RowDataPacket[]>(`
        UPDATE certificates SET emailSent = 1 WHERE id IN (${id})
    `);

    if (rows.length > 0) {
        console.log(`Found ${rows.length} certificates expiring within the next month:`);
    } else {
        console.log('No certificates expiring within the next month.');
    }
}

async function updateDueInvoicesSentEmail(id: any[]) {
    const [rows] = await db.query<RowDataPacket[]>(`
        UPDATE houses SET emailSent = 1 WHERE id IN (${id})
    `);

    if (rows.length > 0) {
        console.log(`Found ${rows.length} payments due:`);
    } else {
        console.log('No payments due.');
    }
}

async function updateContractsSentEmail(id: any[]) {
    const [rows] = await db.query<RowDataPacket[]>(`
        UPDATE houses SET emailSent = 1 WHERE id IN (${id})
    `);

    if (rows.length > 0) {
        console.log(`Found ${rows.length} certificates expiring within the next month:`);
    } else {
        console.log('No certificates expiring within the next month.');
    }
}
