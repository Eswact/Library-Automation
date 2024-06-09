const db = require("../models");
const company = db.company;
const nodemailer = require('nodemailer');

// Get all company infos from the database.
const getInfos = async (req, res) => {
  try {
    const companyInfos = await company.find();
    res.json(companyInfos[0]);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving company infos." });
  }
};

const sendMail = async (req, res) => {
  try {
    const companyMail = "erensaribay37@gmail.com";
    const mailData = req.body;
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'renterensmurf@gmail.com',
        pass: 'utgwplwftqgzoejt'
      }
    });
    const mailOptions = {
      from: 'renterensmurf@gmail.com',
      to: companyMail,
      subject: 'Yeni İletişim Formu Mesajı',
      text: `
        Adı Soyadı: ${mailData.name}
        E-posta: ${mailData.email}
        Mesaj: ${mailData.message}
      `
    };
    await transporter.sendMail(mailOptions);
    res.json({ message: 'E-posta başarıyla gönderildi.' });
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    res.status(500).send({
      message: error.message || 'E-posta gönderme işlemi sırasında bir hata oluştu.'
    });
  }
};

module.exports = {
    getInfos,
    sendMail
};
