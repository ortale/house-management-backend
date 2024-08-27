import { db } from '../config/db';
import { RowDataPacket } from 'mysql2/promise';
import { sendEmailNotification } from './emailService';  // Import the email service

async function checkExpiringCertificates() {
    const [rows] = await db.query<RowDataPacket[]>(`
        SELECT 
            c.id as id, 
            c.name as certificateName, 
            c.expireDate as expireDate, 
            h.name as houseName,
            h.email as email
        FROM certificates c INNER JOIN houses h ON c.houseId = h.id
        WHERE expireDate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 MONTH) AND emailSent = 0
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

