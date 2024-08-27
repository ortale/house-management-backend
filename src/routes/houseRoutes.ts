import express from 'express';
import { HouseService } from '../services/houseService';

const router = express.Router();
const houseService = new HouseService();

router.get('/houses', async (req, res) => {
    const houses = await houseService.getAllHouses();
    res.json(houses);
});

router.post('/houses', async (req, res) => {
    const { name, email } = req.body;
    await houseService.addHouse({ name, email, certificates: [], payments: [] });
    res.status(201).send('House created');
});

router.put('/houses/:id', async (req, res) => {
    const { name, email } = req.body;
    await houseService.updateHouse({ id: parseInt(req.params.id), name, email, certificates: [], payments: [] });
    res.send('House updated');
});

router.delete('/houses/:id', async (req, res) => {
    await houseService.deleteHouse(parseInt(req.params.id));
    res.send('House deleted');
});

export default router;

// UPDATE `certificates` SET `emailSent`='1' WHERE 1
