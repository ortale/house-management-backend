import { db } from '../config/db';
import { RowDataPacket } from 'mysql2/promise';
import { sendDueInvoiceEmailNotification } from './emailService';  // Import the email service

async function checkDueInvoices() {
    const [rows] = await db.query<RowDataPacket[]>(`
        SELECT 
            p.id as id, 
            h.name as houseName,
            p.feeAmount as feeAmount,
            p.dueDate as dueDate,
            h.email as email
        FROM payments p INNER JOIN houses h ON p.houseId = h.id
        WHERE status = 'DUE' AND p.emailSent = 0
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

