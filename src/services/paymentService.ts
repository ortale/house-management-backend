import { db } from '../config/db';
import { Payment } from '../models/payment';

export class PaymentService {
    async addPayment(payment: Omit<Payment, 'id'>): Promise<void> {
        await db.query('INSERT INTO payments (houseId, description, paymentDate, dueDate) VALUES (?, ?, ?, ?)', [
            payment.houseId,
            payment.description,
            payment.paymentDate,
            payment.dueDate,
        ]);
    }

    async updatePayment(payment: Payment): Promise<void> {
        await db.query('UPDATE payments SET description = ?, paymentDate = ?, dueDate = ? WHERE id = ?', [
            payment.description,
            payment.paymentDate,
            payment.dueDate,
            payment.id,
        ]);
    }

    async deletePayment(id: number): Promise<void> {
        await db.query('DELETE FROM payments WHERE id = ?', [id]);
    }
}
