<script setup>
    import { ref, onMounted, onBeforeUnmount} from 'vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/pagination';
    import 'swiper/css/navigation';
    import { Autoplay, Pagination, Navigation } from 'swiper/modules';
    import AjaxScripts from '../scripts/ajaxScripts.js';
    import { getImageFromUploads } from '../scripts/common.js';

    const bannerContent = ref([]);
    const categoryContent = ref([]);
    const itemsToShow = ref(5);
    const latestBooks = ref([]);
    const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth >= 1920) {
        itemsToShow.value = 5;
        } else if (windowWidth >= 800) {
        itemsToShow.value = 4;
        } else if (windowWidth >= 600) {
        itemsToShow.value = 2;
        } else {
        itemsToShow.value = 1;
        }
    };   
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
    function getLatestBooks() {
        let onSuccess = (res) => {
            let last8Books = res.slice(-8).reverse();
            latestBooks.value = last8Books;
        };
        let onError = (err) => {
            console.log(err);
        };
        AjaxScripts.GetBooks({onSuccess, onError});
    }
    onMounted(() => {
        getBanners();
        getCategories();
        getLatestBooks();
        window.addEventListener('resize', handleResize);
        handleResize();
        onBeforeUnmount(() => {
            window.removeEventListener('resize', handleResize);
        });
    });
</script>

<template>
    <main class="w-full flex flex-col justify-center items-center gap-[32px]">
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
            class="w-full h-[380px] sm:h-[186px]"
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
        <div class="w-full flex flex-col gap-[20px]">
            <div class="w-full md:px-[10px] py-[10px] box-border">
                <swiper
                    :slidesPerView=itemsToShow
                    :spaceBetween="50"
                    :loop="true"
                    :grabCursor="true"
                    :centeredSlides="true" 
                    :navigation="true"
                    :modules="modules"
                    class="w-full h-[100px] sm:h-[80px] px-[50px]"
                >
                    <swiper-slide v-for="(item, index) in categoryContent" :key="index">
                        <div class="flex justify-center items-center overflow-hidden rounded-[16px] h-full w-full">
                            <img :src="getImageFromUploads(`categories/${item.img}`)" alt="category" class="w-full h-full opacity-[85%]">
                            <span class="absolute text-[32px] text-white font-bold mb-[8px] text-center">{{ item.name }}</span>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="w-full">
                <h3 class="text-[26px] pl-[12px]">Son Eklenen Kitaplar</h3>
                <hr>
                <div class="w-full flex justify-between items-center gap-[20px] p-[20px]">
                    <!-- latestBooks -->
                </div>
            </div>
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
