import { db } from '../config/db';
import { Payment } from '../models/payment';

export class PaymentService {
    async addPayment(payment: Omit<Payment, 'id'>): Promise<void> {
        await db.query(
            'INSERT INTO payments (houseId, status, rentAmount, feeAmount, paymentDate, dueDate) VALUES (?, ?, ?, ?, ?, ?)', 
			[
                payment.houseId,
                payment.status,
                payment.rentAmount,
                payment.feeAmount,
                payment.paymentDate,
                payment.dueDate
            ]
		);
    }

    async updatePayment(payment: Payment): Promise<void> {
        await db.query(
			'UPDATE payments SET status = ?, rentAmount = ?, feeAmount = ?, paymentDate = ?, dueDate = ? WHERE id = ?',
			[
				payment.status,
				payment.rentAmount,
				payment.feeAmount,
				payment.paymentDate,
				payment.dueDate,
				payment.id,
			]
		);
	}

    async deletePayment(id: number): Promise<void> {
        await db.query('DELETE FROM payments WHERE id = ?', [id]);
    }
}
