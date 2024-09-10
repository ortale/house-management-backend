import { db } from '../config/db';
import { RowDataPacket } from 'mysql2/promise';
import { sendExpContractEmailNotification } from './emailService';  // Import the email service

async function checkExpiringContracts() {
    const [rows] = await db.query<RowDataPacket[]>(`
        SELECT 
            id,
            name,
            email,
            astExpDate
        FROM houses 
        WHERE astExpDate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 MONTH) AND emailSent = 0
    `);

    if (rows.length > 0) {
        console.log(`Found ${rows.length} certificates expiring within the next month:`);

        // Send an email notification
        await sendExpContractEmailNotification(rows);
    } else {
        console.log('No contracts expiring within the next month.');
    }
}

export default checkExpiringContracts;

