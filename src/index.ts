
import express from 'express';
import { NextFunction, Request, Response, Router } from "express"
import bodyParser from 'body-parser';
import houseRoutes from './routes/houseRoutes';
import certificateRoutes from './routes/certificateRoutes';
import paymentRoutes from './routes/paymentRoutes';
import websiteRoutes from './routes/websiteRoutes';
import cron from 'node-cron';
import checkExpiringCertificates from './services/checkExpiringCertificates';
import checkExpiringContracts from './services/checkExpiringContracts';
import checkDueInvoices from './services/checkDueInvoices';

const app = express();

app.use(async (request: Request, response: Response, next: NextFunction) => {
    response.header("Access-Control-Allow-Origin", "*")
    response.header("Access-Control-Allow-Headers", "*")
    response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next()
});

app.use(bodyParser.json());

app.use('/api', houseRoutes);
app.use('/api', certificateRoutes);
app.use('/api', paymentRoutes);
app.use('/api', websiteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Schedule the task to run daily at 7:00 AM
cron.schedule('* * * * *', () => {
    console.log('Running scheduled task: Checking for expiring certificates.');
    checkExpiringCertificates().catch(err => {
        console.error('Error checking expiring certificates:', err);
    });
});

// Schedule the task to run daily at 7:00 AM
cron.schedule('* * * * *', () => {
    console.log('Running scheduled task: Checking for expiring contracts.');
    checkExpiringContracts().catch(err => {
        console.error('Error checking expiring contracts:', err);
    });
});

// Schedule the task to run daily at 7:00 AM
cron.schedule('* * * * *', () => {
    console.log('Running scheduled task: Checking for due invoices.');
    checkDueInvoices().catch(err => {
        console.error('Error checking due invoices:', err);
    });
});
