<script setup>
    import { ref, onMounted, } from 'vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/pagination';
    import 'swiper/css/navigation';
    import { Autoplay, Pagination, Navigation } from 'swiper/modules';
    import AjaxScripts from '../scripts/ajaxScripts.js';
    import { getImageFromUploads } from '../scripts/common.js';

    const bannerContent = ref([]);
    const categoryContent = ref([]);
    const modules = [Autoplay, Pagination, Navigation];
    const swiperRef = ref(null);
    function getBanners() {
        let onSuccess = (res) => {
            console.log(res);
            bannerContent.value = res; 
        };
        let onError = (err) => {
            console.log(err);
        };
        AjaxScripts.GetBanners({onSuccess, onError});
    }
    function getCategories() {
        let onSuccess = (res) => {
            console.log(res);
            categoryContent.value = res; 
        };
        let onError = (err) => {
            console.log(err);
        };
        AjaxScripts.GetCategories({onSuccess, onError});
    }
    onMounted(() => {
        getBanners();
        getCategories();
    });
</script>

<template>
    <main class="w-full flex flex-col justify-center items-center gap-[10px]">
        <swiper
            :slidesPerView="1"
            :loop="true"
            :grabCursor="true"
            :centeredSlides="true" 
            :pagination="{
                clickable: true,
            }"
            :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
            }"
            :modules="modules"
            class="w-full h-[380px]"
            ref="swiperRef"
        >
            <swiper-slide v-for="(item, index) in bannerContent" :key="index" class="w-full h-full">
                <div class="w-full h-full relative">
                    <img :src="getImageFromUploads(`banners/${item.img}`)" alt="slide" class="w-full h-full"/>
                    <div class="absolute w-full box-border p-[20px] bottom-0 h-[120px] bg-gradient-to-t from-[rgb(0,0,0)] to-green-[rgb(18,18,18)] ">
                        <h3 class="text-[28px] text-white">{{ item.title }}</h3>
                        <span class="text-[18px] text-white">{{ item.description }}</span>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <div class="w-full px-[40px] md:px-[10px] py-[10px] box-border max-w-[100rem]">
            <swiper
                :slidesPerView="5"
                :spaceBetween="50"
                :loop="true"
                :grabCursor="true"
                :centeredSlides="true" 
                :navigation="true"
                :modules="modules"
                class="w-full h-[100px] px-[80px]"
            >
                <swiper-slide v-for="(item, index) in categoryContent" :key="index">{{ item.name }}</swiper-slide>
            </swiper>
        </div>
    </main>
</template>

<script>
    export default {
        components: {
            Swiper,
            SwiperSlide,
        }
    };
</script>
