import express from 'express';
import { sendContactFromWebsite } from '../services/emailService';
import { NextFunction, Request, Response } from "express";

const router = express.Router();

router.use(async (request: Request, response: Response, next: NextFunction) => {
    console.log('get response');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router.post('/contact', async (req, res) => {
    await sendContactFromWebsite(req.body);
    res.status(201).send('Payment created');
});

export default router;
