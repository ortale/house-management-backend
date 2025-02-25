import { db } from '../config/db';
import { RowDataPacket } from 'mysql2/promise';
import { sendDueInvoiceEmailNotification } from './emailService';  // Import the email service

async function checkDueInvoices() {
    const [rows] = await db.query<RowDataPacket[]>(`
        SELECT 
            h.id AS id, 
            h.name AS houseName,
            h.rentDate AS rentDate,
            h.rentAmount AS rentAmount,
            h.email AS email
        FROM houses h
        WHERE h.rentDate = DAY(CURDATE()) 
        AND h.emailSent = 0;
    `);

    if (rows.length > 0) {
        console.log(`Found ${rows.length} due invoices:`);

        // Send an email notification
        await sendDueInvoiceEmailNotification(rows);
    } else {
        console.log('No due invoices found.');
    }
}

export default checkDueInvoices;

