import express from "express";
import Contact from "../model/contact.js";
import nodemailer from "nodemailer";
const router = express.Router();
import dotenv from 'dotenv'
dotenv.config()



router.post("/", async (req, res) => {

  if (!req.body || !req.body.name || !req.body.email || !req.body.message) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const { name, email, message } = req.body;

  try {
    // Save to DB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Thanks for contacting us!",
      text: `Hi ${name},

Thanks for your message: "${message}"

I appreciate you reaching out. I'll get back to you as soon as I can!

– Sourav`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Contact saved and email sent!" });
  } catch (error) {
    console.error("Error in POST /contact:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

export default router;
