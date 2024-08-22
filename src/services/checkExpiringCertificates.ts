import { db } from '../config/db';
import { RowDataPacket } from 'mysql2/promise';
import { sendEmailNotification } from './emailService';  // Import the email service

async function checkExpiringCertificates() {
    const [rows] = await db.query<RowDataPacket[]>(`
        SELECT * FROM certificates 
        WHERE expireDate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 MONTH)
    `);

    if (rows.length > 0) {
        console.log(`Found ${rows.length} certificates expiring within the next month:`);

        // Send an email notification
        await sendEmailNotification(rows);

    } else {
        console.log('No certificates expiring within the next month.');
    }
}

export default checkExpiringCertificates;
