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

  // loginUser();
});

const loginUser = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/login', {username: "test", password: "test"});
    const token = response.data;
    const decodedToken = VueJwtDecode.decode(token);
    console.log(decodedToken);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const openMenu = () => {
  document.getElementById('hamburger-menu').classList.add('open');
};
const closeMenu = () => {
  document.getElementById('hamburger-menu').classList.remove('open');
};
</script>

<template>
  <!-- header -->
  <header class="fixed w-full h-[74px] flex justify-between items-center gap-[20px] px-[40px] lg:px-[28px] sm:px-[16px] py-[8px] box-border max-w-[100rem] border-b-[1px] border-[#ddd]">
      <nav class="w-[75%] flex items-center gap-[12%] lg:gap-[4%] text-[20px] xl:text-[18px]">
        <div class="flex items-center gap-[20px]">
          <button @click="openMenu()" class="hidden sm:block"><font-awesome-icon icon="fa-solid fa-bars" size="lg" /></button>
          <RouterLink class="flex items-center justify-center gap-[10px] text-[28px] xl:text-[24px] text-text dark:text-white sm:pb-[5px]" to="/"><!-- <img class="h-[46px]" src="./images/logo.png" alt="logo"> --> QrHane</RouterLink>
        </div>
        <ul class="navbar flex gap-[36px] lg:gap-[12px] text-text dark:text-white pt-[6px] md:hidden">
          <li :class="{ 'active': $route.path === '/' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-house" class="pb-[2px]"/><span>Anasayfa</span></div><hr class="w-0 ease-in-out duration-300 border-main dark:border-white"></RouterLink></li>
          <li :class="{ 'active': $route.path === '/books' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/books"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-book"/><span>Kitaplar</span></div><hr class="w-0 ease-in-out duration-300 border-main dark:border-white"></RouterLink></li>
          <li :class="{ 'active': $route.path === '/about' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/about"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-circle-info"/><span>Hakkımızda</span></div><hr class="w-0 ease-in-out duration-300 border-main dark:border-white"></RouterLink></li>
          <li :class="{ 'active': $route.path === '/contact' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/contact"><div class="px-[10px] flex items-center justify-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-headset"/><span>İletişim</span></div><hr class="w-0 ease-in-out duration-300 border-main dark:border-white"></RouterLink></li>
        </ul>
      </nav>
      <div class="w-[25%] lg:w-[auto] flex justify-end items-center gap-[32px] lg:gap-[24px] sm:gap-[16px]">
        <div>
          <input type="checkbox" id="darkmode-toggle">
          <label for="darkmode-toggle" class="toggle dark:border-white">
            <span class="dark:bg-white">DarkMode</span>
          </label>
        </div>
        <button class="border-[1px] px-[20px] py-[5px] rounded-[12px] text-[16px] font-semibold shadow-md dark:bg-white dark:text-dark dark:shadow-[rgba(255,255,255,0.25)]">Giriş</button>
      </div>
  </header>
  <!-- body -->
  <RouterView class="mt-[100px]"/>
  <!-- footer -->
  <footer></footer>

  <!-- modals -->
  <!-- hamburger menu -->
  <div id="hamburger-menu" class="fixed top-0 left-0 w-0 h-full bg-white text-dark dark:bg-dark dark:text-white overflow-hidden z-0 ease-in-out duration-300">
    <div class="w-full p-[20px] text-[34px] flex justify-end items-start"><button @click="closeMenu()"><font-awesome-icon :icon="['fas', 'circle-xmark']"/></button></div>
    <ul class="w-full flex flex-col gap-[20px] items-start justify-start text-[24px] p-[20px]">
      <li :class="{ 'active': $route.path === '/' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-house" class="pb-[2px]"/><span>Anasayfa</span></div></RouterLink></li>
      <li :class="{ 'active': $route.path === '/books' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/books"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-book"/><span>Kitaplar</span></div></RouterLink></li>
      <li :class="{ 'active': $route.path === '/about' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/about"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-circle-info"/><span>Hakkımızda</span></div></RouterLink></li>
      <li :class="{ 'active': $route.path === '/contact' }" @click="closeMenu()"><RouterLink class="flex w-[100%]" to="/contact"><div class="px-[10px] flex items-center gap-[8px]"><font-awesome-icon icon="fa-solid fa-headset"/><span>İletişim</span></div></RouterLink></li>
    </ul>
  </div>
  <!-- login/register form -->

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
</style>