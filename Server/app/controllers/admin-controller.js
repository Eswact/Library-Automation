const path = require('path');
const fs = require('fs');

const addBannerImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Dosya yüklenemedi.' });
        }
        const imgData = req.file.buffer.toString('base64');
        const filePath = path.join(__dirname, '../../uploads/banners', req.file.originalname);
        fs.writeFileSync(filePath, imgData, 'base64');
        res.status(200).json({ message: 'Resim başarıyla kaydedildi.' });
    } catch (error) {
        console.error('Resim kaydetme hatası:', error);
        res.status(500).json({ error: 'Bir hata oluştu, resim kaydedilemedi.' });
    }
};

const addCompanyImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Dosya yüklenemedi.' });
      }
      const imgData = req.file.buffer.toString('base64');
      const filePath = path.join(__dirname, '../../uploads/company', req.file.originalname);
      fs.writeFileSync(filePath, imgData, 'base64');
      res.status(200).json({ message: 'Resim başarıyla kaydedildi.' });
    } catch (error) {
      console.error('Resim kaydetme hatası:', error);
      res.status(500).json({ error: 'Bir hata oluştu, resim kaydedilemedi.' });
    }
};

module.exports = {
    addBannerImage,
    addCompanyImage
};