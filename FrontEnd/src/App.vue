<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';
import { setlocalstorage, getlocalstorage } from './scripts/common';

onMounted(() => {
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
  document.getElementById('login-button').addEventListener('click', () => {
    event.preventDefault();
    const username = document.querySelector('.sign-section[data-section="1"] input[type="text"]').value;
    const password = document.querySelector('.sign-section[data-section="1"] input[type="password"]').value;
    loginUser(username, password);
  });
});

const loginUser = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/login', {username: username, password: password});
    const token = response.data;
    const decodedToken = VueJwtDecode.decode(token);
    console.log(decodedToken);
    alert('Giriş Başarılı! Hoşgeldin ' + decodedToken.username);
    closeForm();
  } catch (error) {
    console.error('Error:', error.message);
    document.querySelector('.sign-section[data-section="1"] input[type="text"]').value = '';
    document.querySelector('.sign-section[data-section="1"] input[type="password"]').value = '';
    alert('Giriş Başarısız! Kullanıcı adı veya şifre hatalı.');
  }
};

const openMenu = () => {
  document.getElementById('hamburger-menu').classList.add('open');
};
const closeMenu = () => {
  document.getElementById('hamburger-menu').classList.remove('open');
};
const openForm = () => {
  document.getElementById('sign-form').classList.add('open');
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
  <header class="z-[1] fixed w-full h-[74px] flex justify-between items-center gap-[20px] px-[40px] lg:px-[28px] sm:px-[16px] py-[8px] box-border max-w-[100rem] border-b-[1px] border-[#ddd]">
      <nav class="w-[75%] flex items-center gap-[12%] lg:gap-[4%] text-[20px] xl:text-[18px]">
        <div class="flex items-center gap-[20px]">
          <button @click="openMenu()" class="hidden sm:block"><font-awesome-icon icon="fa-solid fa-bars" size="lg" /></button>
          <RouterLink class="flex items-center justify-center gap-[10px] text-[28px] xl:text-[24px] text-text dark:text-white sm:pb-[5px]" to="/"><!-- <img class="h-[46px]" src="./images/logo.png" alt="logo"> --> QrHane</RouterLink>
        </div>
        <ul class="navbar flex gap-[36px] lg:gap-[12px] text-text dark:text-white pt-[6px] md:hidden">
          <li :class="{ 'active': $route.path === '/' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-house" class="pb-[2px]"/><span>Anasayfa</span></div><hr class="w-0 ease-in-out duration-300 border-text dark:border-white"></RouterLink></li>
          <li :class="{ 'active': $route.path === '/books' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/books"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-book"/><span>Kitaplar</span></div><hr class="w-0 ease-in-out duration-300 border-text dark:border-white"></RouterLink></li>
          <li :class="{ 'active': $route.path === '/about' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/about"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-circle-info"/><span>Hakkımızda</span></div><hr class="w-0 ease-in-out duration-300 border-text dark:border-white"></RouterLink></li>
          <li :class="{ 'active': $route.path === '/contact' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/contact"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-headset"/><span>İletişim</span></div><hr class="w-0 ease-in-out duration-300 border-text dark:border-white"></RouterLink></li>
        </ul>
      </nav>
      <div class="w-[25%] lg:w-[auto] flex justify-end items-center gap-[32px] lg:gap-[24px] sm:gap-[16px]">
        <div>
          <input type="checkbox" id="darkmode-toggle">
          <label for="darkmode-toggle" class="toggle dark:border-white">
            <span class="dark:bg-white">DarkMode</span>
          </label>
        </div>
        <button @click="openForm()" class="border-[1px] px-[20px] py-[5px] rounded-[12px] text-[16px] font-semibold shadow-md dark:bg-white dark:text-dark dark:shadow-[rgba(255,255,255,0.25)]">Giriş</button>
      </div>
  </header>
  <!-- body -->
  <RouterView class="mt-[100px] z-[1]"/>
  <!-- footer -->
  <footer></footer>

  <!-- modals -->
  <!-- hamburger menu -->
  <div id="hamburger-menu" class="fixed top-0 left-0 w-0 h-full bg-white text-dark dark:bg-dark dark:text-white overflow-hidden z-0 ease-in-out duration-300">
    <div class="w-full py-[6px] px-[12px] text-[30px] flex justify-end items-start"><button @click="closeMenu()" class="text-red-600 border-red-600"><font-awesome-icon :icon="['fas', 'circle-xmark']"/></button></div>
    <ul class="w-full flex flex-col gap-[20px] items-start justify-start text-[22px] p-[20px]">
      <li :class="{ 'active': $route.path === '/' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-house" class="pb-[2px]"/><span>Anasayfa</span></div></RouterLink></li>
      <li :class="{ 'active': $route.path === '/books' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/books"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-book"/><span>Kitaplar</span></div></RouterLink></li>
      <li :class="{ 'active': $route.path === '/about' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/about"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-circle-info"/><span>Hakkımızda</span></div></RouterLink></li>
      <li :class="{ 'active': $route.path === '/contact' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/contact"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-headset"/><span>İletişim</span></div></RouterLink></li>
    </ul>
  </div>
  <!-- login/register form -->
  <div id="sign-form" class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-0 opacity-0 duration-200">
    <div class="relative flex flex-col gap-[30px] w-[500px] h-[400px] p-[30px] sm:w-full sm:h-full bg-white text-dark border-[1px] border-black sm:border-none rounded-[18px] sm:rounded-none shadow-md sm:shadow-none">
      <button @click="closeForm()" class="absolute cursor-pointer top-[-12px] right-[-14px] sm:top-[2px] sm:right-[2px] text-[30px] h-[30px] w-[30px] bg-white text-red-600 border-red-600 rounded-[50%] flex justify-center items-center overflow-hidden"><font-awesome-icon :icon="['fas', 'circle-xmark']"/></button>
      <div class="w-full flex justify-center items-center">
        <div class="flex justify-center items-center shadow-md shadow-main-shadow rounded-xl">
          <button data-section="1" class="sign-button text-[18px] text-main py-[6px] px-[24px] border-[1px] border-r-0 rounded-tl-xl rounded-bl-xl border-main">Giriş</button>
          <button data-section="2" class="sign-button text-[18px] text-main py-[6px] px-[24px] border-[1px] rounded-tr-xl rounded-br-xl border-main">Kayıt</button>
        </div>
      </div>
      <form data-section="1" class="sign-section hidden flex-col justify-center items-center gap-[40px] p-[40px] w-full h-full">
        <input type="text" class="w-full rounded-[8px] py-[6px] px-[12px] text-text border-[1px] border-main shadow-sm shadow-main-shadow" placeholder="Kullanıcı Adı">
        <input type="password" class="w-full rounded-[8px] py-[6px] px-[12px] text-text border-[1px] border-main shadow-sm shadow-main-shadow" placeholder="Şifre">
        <button id="login-button"class="w-full text-[18px] font-semibold text-white bg-main py-[6px] px-[24px] border-[1px] border-main rounded-[10px] shadow-md shadow-main-shadow">Giriş</button>
      </form>
      <form data-section="2" class="sign-section hidden flex-col justify-center items-center gap-[20px] py-[20px] px-[40px] w-full h-full">
        <input type="text" class="w-full rounded-[8px] py-[6px] px-[12px] text-text border-[1px] border-main shadow-sm shadow-main-shadow" placeholder="Kullanıcı Adı">
        <input type="mail" class="w-full rounded-[8px] py-[6px] px-[12px] text-text border-[1px] border-main shadow-sm shadow-main-shadow" placeholder="E Mail">
        <input type="password" class="w-full rounded-[8px] py-[6px] px-[12px] text-text border-[1px] border-main shadow-sm shadow-main-shadow" placeholder="Şifre">
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
</style>