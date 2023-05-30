const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.post('/send', async (req, res) => {
    const { email, data } = req.body;
    
    let transporter = nodemailer.createTransport({
      service: "smtp.mail2one.com", // Replace this with your email service
      auth: {
        user: "jameswood@mail2one.com", // Replace this with your email
        pass: "YV*jT4!!EUyQVDe", // Replace this with your password
      },
    });

    let mailOptions = {
        from: 'weldon.jona@gmail.com', // Replace this with your email
        to: email, // to the email from the request body
        subject: 'Hello from Node.js Server',
        text: 'This email was sent from Node.js server'
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
