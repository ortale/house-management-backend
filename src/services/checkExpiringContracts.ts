import { db } from '../config/db';
import { RowDataPacket } from 'mysql2/promise';
import { sendExpContractEmailNotification } from './emailService';  // Import the email service

async function checkExpiringContracts() {
	const [rows] = await db.query<RowDataPacket[]>(`
		SELECT 
			h.id,
			h.name,
			h.email,
			h.astExpDate
		FROM houses h
		WHERE 
			-- Contract expiration within next 30 days
			h.astExpDate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 MONTH)

			-- Either never sent, or sent at least 1 month ago
			AND (
				h.astExpEmailSentDate IS NULL
				OR CURDATE() >= DATE_ADD(h.astExpEmailSentDate, INTERVAL 1 MONTH)
			)

			-- Extra safety: only once per day
			AND (
				h.astExpEmailSentDate IS NULL
				OR h.astExpEmailSentDate < CURDATE()
			);
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

