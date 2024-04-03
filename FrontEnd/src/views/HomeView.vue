<script setup>
    import { ref, onMounted, } from 'vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/pagination';
    import 'swiper/css/navigation';
    import { Autoplay, Pagination } from 'swiper/modules';
    import { fetchData } from '../scripts/ajaxScripts.js';
    import { getBannerImage } from '../scripts/common.js';

    const swiperContent = ref([]);
    const modules = [Autoplay, Pagination];
    const swiperRef = ref(null);
    const updateSwiperContent = (data) => {
        swiperContent.value = data; 
    };
    onMounted(() => {
        fetchData('home/banners/published', 
            (res) => {
                console.log(res);
                updateSwiperContent(res);
            },
            (err) => {
                console.log(err);
            }
        );
    });
</script>

<template>
    <main class="w-full mt-[100px]">
        <swiper
            :slidesPerView="1"
            :loop="true"
            :grabCursor="true"
            :centeredSlides="true" 
            :pagination="{
                clickable: true,
            }"
            :modules="modules"
            class="mySwiper w-full h-[400px]"
            ref="swiperRef"
        >
            <!-- Swiper içeriği burada dinamik olarak doldurulacak -->
            <swiper-slide v-for="(item, index) in swiperContent" :key="index" class="w-full h-full pb-[30px]">
                <div class="w-full h-full relative">
                    <img :src="getBannerImage(item.img)" alt="slide" class="w-full h-full"/>
                    <div class="absolute w-full box-border p-[20px] bottom-0 h-[120px] bg-gradient-to-t from-[rgb(0,0,0)] to-green-[rgb(18,18,18)] ">
                        <h3 class="text-[28px] text-white">{{ item.title }}</h3>
                        <span class="text-[18px] text-white">{{ item.description }}</span>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
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
