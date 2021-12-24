const nodemailer = require("nodemailer");
var XMLHttpRequest = require("xhr2");

module.exports.addReviewData = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "rohit@flyweis.technology",
        pass: "svudoncwkjxibrzc",
      },
    });

    var mail = {
      from: "rohit@flyweis.technology",
      to: "rohit@flyweis.technology",
      subject: `${email} sending review: ${subject}`,
      text: `Name: ${name}, Phone: ${phone}, Subject: ${subject}, Message: ${message}`,
    };

    transporter.sendMail(mail, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    let xhr = new XMLHttpRequest();
    xhr.open("post", "/addReviewData");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function () {
      console.log(xhr.responseText);
    };

    return res.status(200).json({ msg: "Message send successfully" });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
