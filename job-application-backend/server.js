const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());

// Use multer for file uploads (store in memory)
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/apply', upload.single('resume'), async (req, res) => {
  const { firstName, lastName, email, phone, dob, linkedin, position } = req.body;
  const resume = req.file;

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sriramborra00@gmail.com', // your Gmail
      pass: '',       // your App Password from Google
    },
  });

  // Email content
  const mailOptions = {
    from: 'sriramborra00@gmail.com', // always your company Gmail
    to: 'sriramborra00@gmail.com',   // receive at your company Gmail
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