import nodemailer from 'nodemailer';

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
        user: "ortale22@gmail.com",
        pass: "oyvu tulc urie obtm", // Use environment variables for better security
    },
});

// Function to send an email notification
export async function sendEmailNotification(certificates: any[]) {
    const emailText = certificates.map(cert => `Certificate: ${cert.name}, Expiry Date: ${cert.expireDate}`).join('\n');

    await transporter.sendMail({
        from: '"Certificate Alert" <info@realanthonyestate.co.uk>', // Sender address
        to: 'ortale22@gmail.com', // List of recipients
        subject: 'Certificates Expiring Soon', // Subject line
        text: `The following certificates are expiring soon:\n\n${emailText}`, // Plain text body
    });

    console.log('Notification email sent.');
}
