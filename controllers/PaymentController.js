const nodemailer = require("nodemailer");
var XMLHttpRequest = require("xhr2");

module.exports.sendPaymentData = async (req, res) => {
  const { name, amount, description } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "jatinflyweis@gmail.com",
        pass: "tsrjftmowfdmmajs",
      },
    });

    var mail = {
      from: "jatinflyweis@gmail.com",
      to: "jatinflyweis@gmail.com",
      subject: `${name} paid you amount`,
      text: `${name} paid you this ${amount}, ${description}`,
    };

    transporter.sendMail(mail, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    let xhr = new XMLHttpRequest();
    xhr.open("post", "/sendPaymentData");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function () {
      console.log(xhr.responseText);
    };

    return res.status(200).json({ msg: "Message send successfully" });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
