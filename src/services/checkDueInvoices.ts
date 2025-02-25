import { db } from '../config/db';
import { RowDataPacket } from 'mysql2/promise';
import { sendDueInvoiceEmailNotification } from './emailService';  // Import the email service

async function checkDueInvoices() {
    const [rows] = await db.query<RowDataPacket[]>(`
        SELECT 
            p.id AS id, 
            h.name AS houseName,
            p.feeAmount AS feeAmount,
            p.dueDate AS dueDate,
            h.rentDate AS rentDate,
            h.email AS email
        FROM payments p 
        INNER JOIN houses h ON p.houseId = h.id
        WHERE p.status = 'Pending' 
        AND DAY(h.rentDate) = DAY(CURDATE()) 
        AND p.emailSent = 0;
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

