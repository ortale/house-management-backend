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
		WHERE
			-- check if tomorrow's day matches the house's rent day
			DAY(DATE_ADD(CURDATE(), INTERVAL 1 DAY)) = h.rentDate

			-- either email was never sent, or it's been at least 1 month since last send
			AND (
				h.emailSentDate IS NULL
				OR CURDATE() >= DATE_ADD(h.emailSentDate, INTERVAL 1 MONTH)
			)

			-- extra safety to ensure only one send per day even if cron runs every minute
			AND (
				h.emailSentDate IS NULL
				OR h.emailSentDate < CURDATE()
			);
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

