const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Add your Stripe secret key to .env
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to create payment intent
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body; // Amount in cents, e.g., 5000 for $50
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd", // Change as needed
      automatic_payment_methods: { enabled: true },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint to send email after payment (call this from frontend after successful payment)
app.post("/send-booking-email", (req, res) => {
  const { bookingDetails } = req.body; // { carType, pickup, dropoff, dates, withDriver, amount, customerEmail }
  const transporter = nodemailer.createTransport({
    service: "gmail", // Or use SendGrid, etc.
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }, // Add to .env
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "owner@example.com", // Your client's email
    subject: "New Booking",
    text: `Booking Details:\nCar: ${bookingDetails.carType}\nWith Driver: ${
      bookingDetails.withDriver ? "Yes" : "No"
    }\nPickup: ${bookingDetails.pickup}\nDropoff: ${
      bookingDetails.dropoff
    }\nDates: ${bookingDetails.dates.start} to ${
      bookingDetails.dates.end
    }\nAmount: $${bookingDetails.amount / 100}\nCustomer: ${
      bookingDetails.customerEmail
    }`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send({ error });
    res.send({ success: true });
  });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
