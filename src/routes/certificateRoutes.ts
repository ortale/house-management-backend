import express from 'express';
import { CertificateService } from '../services/certificateService';
import { sendEmailNotification } from '../services/emailService';

const router = express.Router();
const certificateService = new CertificateService();

router.get('/certificates', async (req, res) => {
    const certificates = await certificateService.getAllCertificates();

    await sendEmailNotification(certificates);

    res.json(certificates);
});

router.post('/certificates', async (req, res) => {
    const { houseId, name, date, expireDate } = req.body;
    await certificateService.addCertificate({ houseId, name, date, expireDate });
    res.status(201).send('Certificate created');
});

router.put('/certificates/:id', async (req, res) => {
    const { name, date, expireDate } = req.body;
    await certificateService.updateCertificate({ id: parseInt(req.params.id), houseId: 0, name, date, expireDate });
    res.send('Certificate updated');
});

router.delete('/certificates/:id', async (req, res) => {
    await certificateService.deleteCertificate(parseInt(req.params.id));
    res.send('Certificate deleted');
});

export default router;
