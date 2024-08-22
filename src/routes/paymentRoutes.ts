import express from 'express';
import { PaymentService } from '../services/paymentService';

const router = express.Router();
const paymentService = new PaymentService();

router.post('/payments', async (req, res) => {
    const { houseId, description, paymentDate, dueDate } = req.body;
    await paymentService.addPayment({ houseId, description, paymentDate, dueDate });
    res.status(201).send('Payment created');
});

router.put('/payments/:id', async (req, res) => {
    const { description, paymentDate, dueDate } = req.body;
    await paymentService.updatePayment({ id: parseInt(req.params.id), houseId: 0, description, paymentDate, dueDate });
    res.send('Payment updated');
});

router.delete('/payments/:id', async (req, res) => {
    await paymentService.deletePayment(parseInt(req.params.id));
    res.send('Payment deleted');
});

export default router;
