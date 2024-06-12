<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';
import { setlocalstorage, getlocalstorage, validateEmail } from './scripts/common';
import { toast } from 'vue3-toastify';

const userRole = ref([]);
const router = useRouter();
const isLogin = ref(false);
const isAdminPage = ref(false);
const updateAdminPageStatus = () => {
  isAdminPage.value = router.currentRoute.value.path.includes('/admin');
};

onMounted(() => {
  // admin-page
  updateAdminPageStatus();
  router.afterEach((to) => {
    updateAdminPageStatus(to);
    // error-handler
    if (getlocalstorage('errMsg') != '') {
      console.log(getlocalstorage('errMsg'));
      toast(getlocalstorage('errMsg'), { autoClose: 3000, type: "error", position: "bottom-right" });
      setlocalstorage('errMsg', '');
    }
  });

  // dark-mode
  const darkModeToggle = document.getElementById('darkmode-toggle');
  if (getlocalstorage('dark-mode') != '') {
    if (getlocalstorage('dark-mode') == 'true') {
      document.documentElement.classList.add('dark');
      darkModeToggle.checked = true;
    } else {
      document.documentElement.classList.remove('dark');
      darkModeToggle.checked = false;
    }
  } else {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
      document.documentElement.classList.add('dark');
      darkModeToggle.checked = true;
    }
  }
  darkModeToggle.addEventListener('click', () => {
    if (darkModeToggle.checked) {
      document.documentElement.classList.add('dark');
      setlocalstorage('dark-mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      setlocalstorage('dark-mode', 'false');
    }
  });

  // login-control
  loginControl();

  // profile-dropdown
  document.querySelector('body').addEventListener('click', (e) => {
    if (!e.target.closest('#profile-but')) {
      document.getElementById('profile-dropdown').classList.remove('open');
    }
    else {
      document.getElementById('profile-dropdown').classList.toggle('open');
    }
  });

  // sign-form
  document.querySelectorAll('.sign-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.sign-button').forEach(button => button.classList.remove('selected'));
      document.querySelectorAll('.sign-section').forEach(section => section.style.display = 'none');
      button.classList.add('selected');
      document.querySelector(`.sign-section[data-section="${button.dataset.section}"]`).style.display = 'flex';
    });
  });
  document.querySelector('.sign-button').click();
});

const loginControl = async () => { 
  if (getlocalstorage('user') != '') {
    const token = getlocalstorage('user');
    const decodedToken = VueJwtDecode.decode(token);
    userRole.value = decodedToken.role;
    isLogin.value = true;
  }
};

const loginUser = async () => {
  const username = document.querySelector('.sign-section[data-section="1"] input[type="text"]').value;
  const password = document.querySelector('.sign-section[data-section="1"] input[type="password"]').value;
  if (username == '' || password == '') return toast('Kullanıcı adı veya şifre boş olamaz.', { autoClose: 3000, type: "error", position: "bottom-right" });
  try {
    const response = await axios.post('http://localhost:3000/api/users/login', {username: username, password: password});
    const token = response.data;
    const decodedToken = VueJwtDecode.decode(token);
    setlocalstorage('user', token);
    toast('Giriş Başarılı! Hoşgeldin ' + decodedToken.username, { autoClose: 3000, type: "success", position: "bottom-right" });
    closeForm();
    loginControl();
  } catch (error) {
    console.error('Error:', error.message);
    document.querySelector('.sign-section[data-section="1"] input[type="text"]').value = '';
    document.querySelector('.sign-section[data-section="1"] input[type="password"]').value = '';
    toast('Giriş Başarısız! Kullanıcı adı veya şifre hatalı.', { autoClose: 3000, type: "error", position: "bottom-right" });
  }
};

const registerUser = async () => {
  const username = document.querySelector('.sign-section[data-section="2"] input[type="text"]').value;
  const mail = document.querySelector('.sign-section[data-section="2"] input[type="mail"]').value;
  const password = document.querySelector('.sign-section[data-section="2"] input[type="password"]').value;
  if (username == '' || mail == '' || password == '') return toast('Kullanıcı adı, e-mail veya şifre boş olamaz.', { autoClose: 3000, type: "error", position: "bottom-right" });
  if (!validateEmail(mail)) return toast('Geçerli bir e-mail adresi giriniz.', { autoClose: 3000, type: "error", position: "bottom-right" });
  try {
    const response = await axios.post('http://localhost:3000/api/users/register', {username: username, mail: mail, password: password});
    if (response.status == 200) toast('Kayıt Başarılı! Hoşgeldin ' + response.data.username, { autoClose: 3000, type: "success", position: "bottom-right" });
    else toast(`${response.message}`, { autoClose: 3000, type: "error", position: "bottom-right" });
    closeForm();
  } catch (error) {
    console.error('Error:', error.message);
    document.querySelector('.sign-section[data-section="2"] input[type="text"]').value = '';
    document.querySelector('.sign-section[data-section="2"] input[type="mail"]').value = '';
    document.querySelector('.sign-section[data-section="2"] input[type="password"]').value = '';
    toast('Kayıt Başarısız! Kullanıcı adı veya e-mail kullanılmakta.', { autoClose: 3000, type: "error", position: "bottom-right" });
  }
};

const logout = () => {
  setlocalstorage('user', '');
  userRole.value = null;
  isLogin.value = false;
};

const openMenu = () => {
  document.getElementById('hamburger-menu').classList.add('open');
};
const closeMenu = () => {
  document.getElementById('hamburger-menu').classList.remove('open');
};
const openForm = () => {
  document.getElementById('sign-form').classList.add('open');
  document.querySelectorAll('#sign-form input').forEach(input => {
    input.value = '';
  });
  document.querySelector('.sign-button:first-child').click();
};
const closeForm = () => {
  document.getElementById('sign-form').classList.remove('open');
};
document.addEventListener('keyup', function(e) {
    if (e.key === 'Escape') {
      document.getElementById('hamburger-menu').classList.remove('open');
      document.getElementById('sign-form').classList.remove('open');
    }
});
</script>

<template>
  <!-- header -->
  <header class="fixed z-20 w-full h-[74px] flex justify-between items-center gap-[20px] px-[40px] lg:px-[28px] sm:px-[16px] py-[8px] box-border max-w-[100rem] border-b-[1px] border-[#ddd] bg-[#fafafa] dark:bg-dark">
      <nav class="w-[75%] flex items-center gap-[12%] lg:gap-[4%] text-[20px] xl:text-[18px]">
        <div class="flex items-center gap-[20px]">
          <button @click="openMenu()" class="hidden sm:block"><font-awesome-icon icon="fa-solid fa-bars" size="lg" /></button>
          <RouterLink @click.native="updateAdminPageStatus('/')" class="flex items-center justify-center gap-[10px] text-[28px] xl:text-[24px] text-text dark:text-white sm:pb-[5px]" to="/"><!-- <img class="h-[46px]" src="./images/logo.png" alt="logo"> --> QrHane</RouterLink>
        </div>
        <ul v-if="isAdminPage"  class="navbar flex gap-[36px] lg:gap-[12px] text-text dark:text-white pt-[6px] md:text-[28px] md:px-[40px] sm:hidden">
          <li :class="{ 'active': $route.path === '/admin' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/admin"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-house" class="pb-[2px]"/><span class="md:hidden">Panel</span></div><hr class="w-0 ease-in-out duration-300 border-text dark:border-white md:hidden"></RouterLink></li>
          <li :class="{ 'active': $route.path === '/admin/books' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/admin/books"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-book"/><span class="md:hidden">Kitaplar</span></div><hr class="w-0 ease-in-out duration-300 border-text dark:border-white md:hidden"></RouterLink></li>
          <li :class="{ 'active': $route.path === '/admin/company' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/admin/company"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-circle-info"/><span class="md:hidden">Kütüphane</span></div><hr class="w-0 ease-in-out duration-300 border-text dark:border-white md:hidden"></RouterLink></li>
          <li :class="{ 'active': $route.path === '/admin/users' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/admin/users"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-user-pen" /><span class="md:hidden">Kullanıcılar</span></div><hr class="w-0 ease-in-out duration-300 border-text dark:border-white md:hidden"></RouterLink></li>
        </ul>
        <ul v-else  class="navbar flex gap-[36px] lg:gap-[12px] text-text dark:text-white pt-[6px] md:text-[28px] md:px-[40px] sm:hidden">
          <li @click.native="updateAdminPageStatus('/')" :class="{ 'active': $route.path === '/' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-house" class="pb-[2px]"/><span class="md:hidden">Anasayfa</span></div><hr class="w-0 ease-in-out duration-300 border-text dark:border-white md:hidden"></RouterLink></li>
          <li @click.native="updateAdminPageStatus('/books')" :class="{ 'active': $route.path === '/books' || $route.path.includes('/detail/') }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/books"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-book"/><span class="md:hidden">Kitaplar</span></div><hr class="w-0 ease-in-out duration-300 border-text dark:border-white md:hidden"></RouterLink></li>
          <li @click.native="updateAdminPageStatus('/about')" :class="{ 'active': $route.path === '/about' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/about"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-circle-info"/><span class="md:hidden">Hakkımızda</span></div><hr class="w-0 ease-in-out duration-300 border-text dark:border-white md:hidden"></RouterLink></li>
          <li @click.native="updateAdminPageStatus('/contact')" :class="{ 'active': $route.path === '/contact' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/contact"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-headset"/><span class="md:hidden">İletişim</span></div><hr class="w-0 ease-in-out duration-300 border-text dark:border-white md:hidden"></RouterLink></li>
        </ul>
      </nav>
      <div class="w-[25%] lg:w-[auto] flex justify-end items-center gap-[32px] lg:gap-[24px] sm:gap-[16px]">
        <div>
          <input type="checkbox" id="darkmode-toggle">
          <label for="darkmode-toggle" class="toggle dark:border-white">
            <span class="dark:bg-white">DarkMode</span>
          </label>
        </div>
        <button v-if="!isLogin" id="sign-but" @click="openForm()" class="border-[1px] px-[20px] py-[5px] rounded-[12px] text-[16px] font-semibold shadow-md dark:bg-white dark:text-dark dark:shadow-[rgba(255,255,255,0.25)]">Giriş</button>
        <RouterLink to="/" v-else-if="isAdminPage" id="back2Home-but" class="px-[10px] py-[8px] text-dark-blue dark:text-white"><font-awesome-icon icon="fa-solid fa-right-from-bracket" size="2xl"/></RouterLink>
        <button v-else id="profile-but" class="px-[10px] py-[8px] text-dark-blue dark:text-white"><font-awesome-icon icon="fa-solid fa-user" size="2xl"/></button>
        <div id="profile-dropdown" class="absolute w-[180px] mx-[4px] top-[70px] right-0 flex flex-col gap-0 rounded-md shadow-md shadow-dark-blue dark:shadow-second">
          <font-awesome-icon class="text-dark-blue dark:text-second absolute right-[52px] top-[-15px]" :icon="['fas', 'caret-up']" size="lg" />
          <div class="bg-white w-full h-full rounded-md border-[2px] border-dark-blue dark:border-second">
            <ul class="w-full h-full flex flex-col items-center justify-center">
              <li v-if="userRole == 0" class="w-full cursor-pointer h-[40px] border-b-[1px] border-dark-blue dark:border-second hover:bg-dark-blue dark:hover:bg-second" ><RouterLink class="h-full w-full p-[4px] flex items-center justify-center text-[18px] font-semibold text-dark-blue dark:text-second hover:text-white dark:hover:text-white" to="/admin">Yönetici Paneli</RouterLink></li>
              <li @click="logout()" class="w-full cursor-pointer p-[4px] h-[40px] flex items-center justify-center text-[18px] font-semibold text-dark-blue dark:text-second hover:bg-dark-blue hover:text-white dark:hover:bg-second dark:hover:text-white">Çıkış</li>
            </ul>
          </div>
        </div>
      </div>
  </header>
  <!-- body -->
  <RouterView class="mt-[100px] max-w-[100rem]"/>
  <!-- footer -->
  <footer></footer>

  <!-- modals -->
  <!-- hamburger menu -->
  <div id="hamburger-menu" class="fixed top-0 left-0 w-0 h-full bg-white text-dark dark:bg-dark dark:text-white overflow-hidden z-0 ease-in-out duration-300">
    <div class="w-full pt-[16px] px-[16px] text-[30px] flex justify-end items-start"><button @click="closeMenu()" class="text-red-600 border-red-600 w-[30px] h-[30px] flex items-center justify-center bg-white rounded-[50%]"><font-awesome-icon :icon="['fas', 'circle-xmark']"/></button></div>
    <ul v-if="isAdminPage"  class="w-full flex flex-col gap-[20px] items-start justify-start text-[22px] p-[20px]">
      <li :class="{ 'active': $route.path === '/admin' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/admin"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-house" class="pb-[2px]"/><span>Durum</span></div></RouterLink></li>
      <li :class="{ 'active': $route.path === '/admin/books' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/admin/books"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-book"/><span>Kitaplar</span></div></RouterLink></li>
      <li :class="{ 'active': $route.path === '/admin/company' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/admin/company"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-circle-info"/><span>Kütüphane</span></div></RouterLink></li>
      <li :class="{ 'active': $route.path === '/admin/users' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/admin/users"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-user-pen"/><span>Kullanıcılar</span></div></RouterLink></li>
    </ul>
    <ul v-else  class="w-full flex flex-col gap-[20px] items-start justify-start text-[22px] p-[20px]">
      <li :class="{ 'active': $route.path === '/' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-house" class="pb-[2px]"/><span>Anasayfa</span></div></RouterLink></li>
      <li :class="{ 'active': $route.path === '/books' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/books"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-book"/><span>Kitaplar</span></div></RouterLink></li>
      <li :class="{ 'active': $route.path === '/about' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/about"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-circle-info"/><span>Hakkımızda</span></div></RouterLink></li>
      <li :class="{ 'active': $route.path === '/contact' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/contact"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-headset"/><span>İletişim</span></div></RouterLink></li>
    </ul>
  </div>
  <!-- login/register form -->
  <div id="sign-form" class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-[-1] opacity-0 duration-200">
    <div class="relative flex flex-col gap-[30px] w-[500px] h-[400px] p-[30px] sm:w-full sm:h-full bg-white text-dark border-[1px] border-black sm:border-none rounded-[18px] sm:rounded-none shadow-md sm:shadow-none">
      <button @click="closeForm()" class="absolute cursor-pointer top-[-12px] right-[-14px] sm:top-[2px] sm:right-[2px] text-[30px] h-[30px] w-[30px] bg-white text-red-600 border-red-600 rounded-[50%] flex justify-center items-center overflow-hidden"><font-awesome-icon :icon="['fas', 'circle-xmark']"/></button>
      <div class="w-full flex justify-center items-center">
        <div class="flex justify-center items-center shadow-md shadow-main-shadow rounded-xl">
          <button data-section="1" class="sign-button text-[18px] text-main py-[6px] px-[24px] border-[1px] border-r-0 rounded-tl-xl rounded-bl-xl border-main">Giriş</button>
          <button data-section="2" class="sign-button text-[18px] text-main py-[6px] px-[24px] border-[1px] rounded-tr-xl rounded-br-xl border-main">Kayıt</button>
        </div>
      </div>
      <form @submit.prevent="loginUser" data-section="1" class="sign-section hidden flex-col justify-center items-center gap-[40px] p-[40px] w-full h-full">
        <input type="text" class="w-full rounded-[8px] py-[6px] px-[12px] text-text border-[1px] border-main shadow-sm shadow-main-shadow" placeholder="Kullanıcı Adı" required>
        <input type="password" class="w-full rounded-[8px] py-[6px] px-[12px] text-text border-[1px] border-main shadow-sm shadow-main-shadow" placeholder="Şifre" required>
        <button id="login-button"class="w-full text-[18px] font-semibold text-white bg-main py-[6px] px-[24px] border-[1px] border-main rounded-[10px] shadow-md shadow-main-shadow">Giriş</button>
      </form>
      <form @submit.prevent="registerUser" data-section="2" class="sign-section hidden flex-col justify-center items-center gap-[20px] py-[20px] px-[40px] w-full h-full">
        <input type="text" class="w-full rounded-[8px] py-[6px] px-[12px] text-text border-[1px] border-main shadow-sm shadow-main-shadow" placeholder="Kullanıcı Adı" required>
        <input type="mail" class="w-full rounded-[8px] py-[6px] px-[12px] text-text border-[1px] border-main shadow-sm shadow-main-shadow" placeholder="E Mail" required>
        <input type="password" class="w-full rounded-[8px] py-[6px] px-[12px] text-text border-[1px] border-main shadow-sm shadow-main-shadow" placeholder="Şifre" required>
        <button id="register-button" class="w-full text-[18px] font-semibold text-white bg-main py-[6px] px-[24px] border-[1px] border-main rounded-[10px] shadow-md shadow-main-shadow">Kayıt</button>
      </form>
    </div>
  </div>

</template>
<style scoped>
  .active, .active hr {
    color: #EEC681;
    border-color: #EEC681;
    width: 100%;
  }
  .navbar li:hover hr {
    width: 100%;
  }
  #hamburger-menu.open {
    width: 100%;
    z-index: 40;
  }
  #sign-form.open {
    opacity: 1;
    z-index: 30;
  }
  .sign-button.selected {
    background-color: #2894B5;
    color: white;
  }
  #profile-dropdown {
    display: none;
  }
  #profile-dropdown.open {
    display: flex;
  }
</style>