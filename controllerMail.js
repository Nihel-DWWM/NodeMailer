    import transporter from './transporter.js';

    export async function sendMail(req, res) {
        try {
            await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: 'recipient@example.com',
                subject: 'Hello',
                text: 'Hello World'
            });
            res.send('Email sent');
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        }
    }