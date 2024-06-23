<script setup>
    import { ref, onMounted, onBeforeUnmount} from 'vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/pagination';
    import 'swiper/css/navigation';
    import { Autoplay, Pagination, Navigation } from 'swiper/modules';
    import AjaxScripts from '../scripts/ajaxScripts.js';
    import { getImageFromUploads, getDetailsPage } from '../scripts/common.js';
    import { useRouter } from 'vue-router';
    const router = useRouter();

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

    function directBooksWithCategory(catId) {
        window.location.href = `/books?category=${catId}`;
    }
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
            class="w-full h-[340px] sm:h-[186px]"
            ref="swiperRef"
        >
            <swiper-slide v-for="(item, index) in bannerContent" :key="index" class="w-full h-full">
                <div class="w-full h-full relative">
                    <img :src="getImageFromUploads(`banners/${item.img}`)" alt="slide" class="w-full h-full"/>
                    <div class="absolute w-full box-border p-[20px] pb-[30px] bottom-0 min-h-[120px] bg-gradient-to-t from-[rgb(0,0,0)] to-green-[rgb(18,18,18)] ">
                        <h3 class="text-[28px] text-white">{{ item.title }}</h3>
                        <span class="text-[18px] text-white sm:hidden">{{ item.description }}</span>
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
                        <div @click="directBooksWithCategory(item.catId)" class="flex justify-center items-center overflow-hidden rounded-[16px] h-full w-full border-[1px] border-second-shadow shadow-sm shadow-second-shadow">
                            <img :src="getImageFromUploads(`categories/${item.img}`)" alt="category" class="w-full h-full opacity-[85%]">
                            <span class="absolute text-[32px] text-white font-bold mb-[8px] text-center">{{ item.name }}</span>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="w-full">
                <h3 class="text-[26px] pl-[12px]">Son Eklenen Kitaplar</h3>
                <hr>
                <div class="w-full flex gap-[20px] p-[20px] flex-wrap justify-center items-center">
                    <swiper
                        :slidesPerView=itemsToShow
                        :spaceBetween="50"
                        :loop="true"
                        :grabCursor="true"
                        :centeredSlides="true" 
                        :navigation="true"
                        :modules="modules"
                        class="w-full"
                    >
                        <swiper-slide v-for="book in latestBooks" :key="book._id">
                            <div class="flex justify-center items-center sm:w-full">
                                <div v-if="book.isBorrowed" class="relative dark:bg-[rgba(155,155,155,0.55)] w-[220px] h-[270px] p-[16px] border-[2px] border-[rgba(155,155,155,0.75)] rounded-[12px] shadow-md shadow-[rgba(155,155,155,0.55)] flex flex-col justify-center items-center gap-[8px]">
                                    <div class="absolute top-[4px] w-full px-[12px] flex justify-between items-center text-[14px] font-semibold">
                                        <span v-if="(categoryContent.find(x => x.catId == book.category) != null)">{{ categoryContent.find(x => x.catId == book.category).name }}</span>
                                        <span v-else>Diğer</span>
                                    </div>
                                    <img :src="getImageFromUploads(`books/${book.images[0]}`)" :alt=book.name class="h-[150px] max-w-full rounded-[5px] grayscale">
                                    <span :title=book.name class="text-[18px] font-semibold text-center truncate max-w-full">{{ book.name }}</span>
                                    <span class="absolute bottom-[4px] text-[16px] font-semibold text-red-800">Mevcut Değil</span>
                                </div>
                                <div v-else class="relative dark:bg-main-shadow cursor-pointer w-[220px] h-[270px] p-[16px] border-[2px] border-main rounded-[12px] shadow-md shadow-main-shadow flex flex-col justify-center items-center gap-[8px]" @click="getDetailsPage(router, book._id)">
                                    <div class="absolute top-[4px] w-full px-[12px] flex justify-between items-center text-[14px] font-semibold">
                                        <span v-if="(categoryContent.find(x => x.catId == book.category) != null)">{{ categoryContent.find(x => x.catId == book.category).name }}</span>
                                        <span v-else>Diğer</span>
                                    </div>
                                    <img :src="getImageFromUploads(`books/${book.images[0]}`)" :alt=book.name class="h-[150px] max-w-full rounded-[5px]">
                                    <span :title=book.name class="text-[18px] font-semibold text-center truncate max-w-full">{{ book.name }}</span>
                                    <span class="absolute bottom-[4px] text-[14px] font-semibold text-second">Detaylar için tıkla</span>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
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
