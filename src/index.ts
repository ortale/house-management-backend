import express from 'express';
import bodyParser from 'body-parser';
import houseRoutes from './routes/houseRoutes';
import certificateRoutes from './routes/certificateRoutes';
import paymentRoutes from './routes/paymentRoutes';
import cron from 'node-cron';
import checkExpiringCertificates from './services/checkExpiringCertificates';

const app = express();
app.use(bodyParser.json());

app.use('/api', houseRoutes);
app.use('/api', certificateRoutes);
app.use('/api', paymentRoutes);

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
