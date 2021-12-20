const express = require("express");
const bodyParser = require("body-parser");
const ContactRoutes = require("./routes/contactRoutes");
const ReviewRoutes = require("./routes/reviewRoutes");
const PaymentRoutes = require("./routes/paymentRoutes");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use("/", ContactRoutes);
app.use("/", ReviewRoutes);
app.use("/", PaymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Your app is running`);
});
