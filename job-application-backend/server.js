// server.js
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/apply', upload.single('resume'), async (req, res) => {
  const { firstName, lastName, email, phone, dob, linkedin, position } = req.body;
  const resume = req.file;

  // Set up Nodemailer transporter (App Password method)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'sriramborra00@gmail.com', // your Gmail
      pass: 'fjde dcfe qxbp jsjd',    // your App Password from Google
    },
  });

  // Email content
  const mailOptions = {
    from: 'sriramborra00@gmail.com', // always your company Gmail
    to: 'career@synnectify.com',  // Hostinger mailbox
    subject: `New Job Application for ${position} from ${firstName} ${lastName}`,
    text: `
Position: ${position}
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
DOB: ${dob}
LinkedIn: ${linkedin}
    `,
    attachments: resume
      ? [
          {
            filename: resume.originalname,
            content: resume.buffer,
          },
        ]
      : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Application sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send application.' });
  }
});

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});