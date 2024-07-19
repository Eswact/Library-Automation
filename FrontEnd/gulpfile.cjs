const gulp = require('gulp');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const puppeteer = require('puppeteer'); 

const API_BASE_URL = 'http://localhost:3000/api';

// login
gulp.task('login', async (done) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, { username: 'test', password: 'test' });
    const token = response.data;
    const decodedToken = jwt.decode(token);
    console.log('Giriş başarılı:', decodedToken);

    let rentReqData = {
      bookId: "65f6da433a9e3a7a90a16001",
      userId: decodedToken.id,
    };
    const response2 = await axios.post(`${API_BASE_URL}/books/createRequest`, rentReqData);
    console.log('Kiralama isteği oluşturuldu:', response2.data);

    done();
  } catch (error) {
    console.error('Giriş hatası:', error.message);
    done(error);
  }
});

// click test
gulp.task('clickButton', async (done) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--start-maximized']
    });

    const [page] = await browser.pages();

    await page.goto('http://localhost:5072');
    
    await page.waitForSelector('#sign-but', { visible: true });

    const buttonExists = await page.$('#sign-but');
    if (buttonExists) {
      await page.click('#sign-but');
      console.log('Butona tıklandı.');
      await page.evaluate(() => {
        document.querySelectorAll('form input')[0].value = "test";
        document.querySelectorAll('form input')[1].value = "test";
        document.getElementById('login-button').click();
      });
      console.log('Login işlemi yapıldı.');
    } else {
      console.log('Buton bulunamadı.');
    }

    done();
  } catch (error) {
    console.error('Buton tıklama hatası:', error.message);
    done(error);
  }
});

// tasks
gulp.task('default', gulp.series(/*'login',*/ 'clickButton'));