const path = require('path');
const fs = require('fs');

const addImage2Upload = async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ error: 'Dosya yüklenemedi.' });
      }
      const imgData = req.file.buffer.toString('base64');
      const filePath = path.join(__dirname, `../../uploads/${req.body.path}`, req.file.originalname);
      fs.writeFileSync(filePath, imgData, 'base64');
      res.status(200).json({ message: 'Resim başarıyla kaydedildi.' });
  } catch (error) {
      console.error('Resim kaydetme hatası:', error);
      res.status(500).json({ error: 'Bir hata oluştu, resim kaydedilemedi.' });
  }
};

module.exports = {
    addImage2Upload
};