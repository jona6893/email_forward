const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/send', async (req, res) => {
    const {email} = req.body;
    
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Replace this with your email service
        auth: {
            user: 'weldon.jona@gmail.com', // Replace this with your email
            pass: 'PoXRGoetA7JrTfgfco' // Replace this with your password
        }
    });

    let mailOptions = {
        from: 'weldon.jona@gmail.com', // Replace this with your email
        to: email, // to the email from the request body
        subject: 'Hello from Node.js Server',
        text: 'This email was sent from Node.js server'
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({message: 'Email sent successfully'});
    } catch (error) {
        res.status(500).json({error: 'There was an error sending the email'});
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
