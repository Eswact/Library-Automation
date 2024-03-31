<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';

onMounted(() => {
  loginUser();
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
  <!-- <div class="w-full h-[40px] bg-main flex items-center justify-center text-white">BANNER</div> -->
  <header class="fixed w-full h-[80px] flex justify-between items-center gap-[20px] px-[40px] py-[10px] box-border max-w-[100rem] border-b-[1px] border-[#ddd]">
      <nav class="w-[75%] flex gap-[15%] text-[16px]">
        <RouterLink to="/">LOGO</RouterLink>
        <div class="flex gap-[34px]">
          <RouterLink to="/">Anasayfa</RouterLink>
          <RouterLink to="/about">Kitaplar</RouterLink>
          <RouterLink to="/about">Hakkımızda</RouterLink>
          <RouterLink to="/about">İletişim</RouterLink>
          <RouterLink to="/about">Yönetici Paneli</RouterLink>
        </div>
      </nav>
      <div class="w-[25%] flex justify-end items-center gap-[34px]">
        <div>
          <input type="checkbox" id="darkmode-toggle">
          <label for="darkmode-toggle" class="toggle">
            <span>DarkMode</span>
          </label>
        </div>
        <button class="border-[1px] px-[20px] py-[5px] rounded-[12px] text-[17px] font-semibold shadow-md">Giriş</button>
      </div>
  </header>
  <RouterView />
</template>