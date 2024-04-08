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
</script>

<template>
  <header class="fixed w-full h-[80px] flex justify-between items-center gap-[20px] px-[40px] sm:px-[16px] py-[10px] box-border max-w-[100rem] border-b-[1px] border-[#ddd]">
      <nav class="w-[75%] flex items-center gap-[16%] lg:gap-[4%] text-[20px] xl:text-[18px]">
        <RouterLink class="flex items-center justify-center gap-[10px] text-[28px] xl:text-[24px] text-text dark:text-white" to="/"><!-- <img class="h-[46px]" src="./images/logo.png" alt="logo"> --> QrHane</RouterLink>
        <ul class="navbar flex gap-[36px] lg:gap-[12px] text-text dark:text-white pt-[6px] md:hidden">
          <li :class="{ 'active': $route.path === '/' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/"><span class="px-[10px]">Anasayfa</span><hr class="w-0 ease-in-out duration-300 border-main dark:border-white"></RouterLink></li>
          <li :class="{ 'active': $route.path === '/books' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/books"><span class="px-[10px]">Kitaplar</span><hr class="w-0 ease-in-out duration-300 border-main dark:border-white"></RouterLink></li>
          <li :class="{ 'active': $route.path === '/about' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/about"><span class="px-[10px]">Hakkımızda</span><hr class="w-0 ease-in-out duration-300 border-main dark:border-white"></RouterLink></li>
          <li :class="{ 'active': $route.path === '/contact' }"><RouterLink class="flex flex-col w-[100%] justify-center items-center" to="/contact"><span class="px-[10px]">İletişim</span><hr class="w-0 ease-in-out duration-300 border-main dark:border-white"></RouterLink></li>
        </ul>
      </nav>
      <div class="w-[25%] flex justify-end items-center gap-[34px] md:gap-[24px] sm:gap-[16px]">
        <div>
          <input type="checkbox" id="darkmode-toggle">
          <label for="darkmode-toggle" class="toggle dark:border-white">
            <span class="dark:bg-white">DarkMode</span>
          </label>
        </div>
        <button class="border-[1px] px-[20px] py-[5px] rounded-[12px] text-[17px] lg:text-[16px] font-semibold shadow-md dark:bg-white dark:text-dark dark:shadow-[rgba(255,255,255,0.25)]">Giriş</button>
      </div>
  </header>
  <RouterView class="mt-[100px]"/>
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
</style>