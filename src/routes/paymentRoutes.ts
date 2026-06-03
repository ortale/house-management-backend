import express from 'express';
import { PaymentService } from '../services/paymentService';
import { Authorize } from '../config/jwt/security';

const router = express.Router();
const paymentService = new PaymentService();

router.post('/payments', Authorize, async (req, res) => {
    const { houseId, paymentDate, dueDate, rentAmount, feeAmount, status } = req.body;
    await paymentService.addPayment({ houseId, paymentDate, dueDate, rentAmount, feeAmount, status });
    res.status(201).send('Payment created');
});

router.put('/payments/:id', Authorize, async (req, res) => {
    const { houseId, status, paymentDate, dueDate, rentAmount, feeAmount } = req.body;
    await paymentService.updatePayment(
        { id: parseInt(req.params.id), houseId, paymentDate, dueDate, status, rentAmount, feeAmount }
    );
    res.send('Payment updated');
});

router.delete('/payments/:id', Authorize, async (req, res) => {
    await paymentService.deletePayment(parseInt(req.params.id));
    res.send('Payment deleted');
});

export default router;
