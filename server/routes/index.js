const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const fs = require("fs");
const PDFDocument = require("pdfkit");

router.post("/uploadPicture", (req, res, next) => {
  if (!fs.existsSync("./temp_uploads")){
    fs.mkdirSync("./temp_uploads");
}
  //conversion to base64
  let image = req.body.image.replace(/^data:image\/png;base64,/, "");
  fs.writeFile("./temp_uploads/documentUserABC.png", image, "base64", function(
    err
  ) {
    if (err) {
      console.log(err);
      res.json({
        message: "error while uploading picture"
      });
    }
    res.json({
      message: "success uploading picture"
    });
  });
});

router.post("/sendPicture", (req, res, next) => {
  let imgToPDF = new PDFDocument();
  imgToPDF.pipe(fs.createWriteStream(`./temp_uploads/documentUserABC.pdf`));
  imgToPDF.image("./temp_uploads/documentUserABC.png", 0, 0, {
    width: 595 //width in pixel of whole document at 72 pixel per inch (DIN A4)
  });
  imgToPDF.end();

  let message =
    "The user ABC sent the following document to be found in the attachment";
  let subject = "A document from user ABC";
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_MAIL,
      pass: process.env.GMAIL_PW
    }
  });

  transporter
    .sendMail({
      from: "The user ABC",
      to: "coding-challenge@mieterengel.de",
      subject: subject,
      text: message,
      html: message,
      attachments: [
        {
          filename: "documentUserABC.pdf",
          path: `./temp_uploads/documentUserABC.pdf`
        }
      ]
    })
    .then(mailResponse => {
      console.log(mailResponse);
      // delete image- and pdf-file
      fs.unlink(`./temp_uploads/documentUserABC.pdf`, err => {
        if (err) throw err;
        console.log(`successfully deleted ./temp_uploads/documentUserABC.pdf`);
      });
      fs.unlink(`./temp_uploads/documentUserABC.png`, err => {
        if (err) throw err;
        console.log(`successfully deleted ./temp_uploads/documentUserABC.png`);
      });
      res.json({
        message: "The document was successfully sent!"
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        message: "The document could not be sent"
      });
    });
});

module.exports = router;
