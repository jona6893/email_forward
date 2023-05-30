const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.post('/send', async (req, res) => {
    const { email, data } = req.body;
    
    console.log(email);
    console.log(data);

  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER, // use your email environment variable
      pass: process.env.EMAIL_PASSWORD, // use your password environment variable
    },
    tls: {
      ciphers: "SSLv3",
    },
  });


    let mailOptions = {
      from: process.env.EMAIL_USER, // Replace this with your email
      to: email, // to the email from the request body
      subject: "Hello from Node.js Server",
      text: "This email was sent from Node.js server",
    };

   try {
     await transporter.sendMail(mailOptions);
     res.status(200).json({ message: "Email sent successfully" });
   } catch (error) {
     console.error(error); // Add this line to log the error
     res.status(500).json({ error: "There was an error sending the email" });
   }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
