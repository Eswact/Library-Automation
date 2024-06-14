<script setup>
    import { ref, onMounted } from 'vue';
    import AjaxScripts from '../scripts/ajaxScripts.js';
    import { getImageFromUploads } from '../scripts/common.js';

    const books = ref([]);
    const writers = ref([]);
    const categories = ref([]);
    const publishers = ref([]);

    async function fetchDatas() {
        await Promise.all([
            getBooks(),
            getWriters(),
            getCategories(),
            getPublishers()
        ]);
    }

    function getBooks() {
        return new Promise((resolve, reject) => {
            AjaxScripts.GetBooks({
                onSuccess: (res) => {
                    books.value = res;
                    resolve();
                },
                onError: (err) => {
                    console.log(err);
                    reject(err);
                }
            });
        });
    }
    function getWriters() {
        return new Promise((resolve, reject) => {
            AjaxScripts.GetWriters({
                onSuccess: (res) => {
                    writers.value = res;
                    resolve();
                },
                onError: (err) => {
                    console.log(err);
                    reject(err);
                }
            });
        });
    }
    function getCategories() {
        return new Promise((resolve, reject) => {
            AjaxScripts.GetCategories({
                onSuccess: (res) => {
                    categories.value = res;
                    resolve();
                },
                onError: (err) => {
                    console.log(err);
                    reject(err);
                }
            });
        });
    }
    function getPublishers() {
        return new Promise((resolve, reject) => {
            AjaxScripts.GetPublishers({
                onSuccess: (res) => {
                    publishers.value = res;
                    resolve();
                },
                onError: (err) => {
                    console.log(err);
                    reject(err);
                }
            });
        });
    }

    //Ready
    onMounted(() => {
        //Requests
        fetchDatas();
        //Tabs
        const tabs = document.querySelectorAll('.adminTabs span');
        const settingsContents = document.querySelectorAll('.settingsContent');
        console.log(tabs)
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(tab => tab.classList.remove('selected'));
                tab.classList.add('selected');
                settingsContents.forEach(settingsContent => settingsContent.style.display = 'none');
                const number = tab.dataset.number;
                const settingsContent = document.querySelector(`.settingsContent[data-number="${number}"]`);
                settingsContent.style.display = 'flex';
            });
        });
        document.querySelector('.adminTabs span[data-number="1"]').click();
    });
</script>

<template>
    <div class="w-full">
        <div class="adminTabs w-full flex items-center justify-around p-[16px] text-[18px] md:px-0 sm:flex-col sm:gap-[14px]">
            <span class="sm:w-[200px] text-center" data-number="1">Kitaplar</span>
            <span class="sm:w-[200px] text-center"  data-number="2">Yazarlar</span>
            <span class="sm:w-[200px] text-center" data-number="3">Kategoriler</span>
            <span class="sm:w-[200px] text-center" data-number="4">Yayınevleri</span>
        </div>
        <div data-number="1" class="settingsContent w-full flex-col gap-[20px] py-[20px]">
            <div class="w-full flex flex-col items-center justify-center gap-[10px] px-[20px]">
                <h1 class="text-[20px] text-main dark:text-white w-full">Kitaplar</h1>
                <hr class="w-full mb-[12px]">
                <div class="flex flex-wrap items-center w-full gap-[20px]">
                    <div v-for="book in books" :key="book._id" >
                        <div class="relative dark:bg-main-shadow cursor-pointer w-[200px] h-[250px] p-[10px] pt-[24px] border-[2px] border-main rounded-[12px] shadow-md shadow-main-shadow flex flex-col justify-center items-center gap-[12px]">
                            <div class="absolute top-[4px] w-full px-[12px] flex justify-between items-center text-[14px] font-semibold">
                                <span>Düzenle</span>
                                <span>Sil</span>
                            </div>
                            <img :src="getImageFromUploads(`books/${book.images[0]}`)" :alt=book.name class="h-[150px] max-w-full rounded-[5px]">
                            <span :title=book.name class="text-[18px] font-semibold text-center truncate max-w-full">{{ book.name }}</span>
                        </div>
                    </div>
                    <div>
                        <div class="relative dark:bg-main-shadow cursor-pointer w-[200px] h-[250px] p-[10px] border-[2px] border-main rounded-[12px] shadow-md shadow-main-shadow flex flex-col justify-center items-center gap-[12px]">
                            <div class="border-main border-[2px] rounded-[50%] text-main bg-white w-[50px] h-[50px] shadow-sm shadow-main flex justify-center items-center">
                                <font-awesome-icon icon="fa-solid fa-plus" size="2xl"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div data-number="2" class="settingsContent w-full flex-col gap-[20px] py-[20px]">
            <div class="w-full flex flex-col items-center justify-center gap-[10px] px-[20px]">
                <h1 class="text-[20px] text-main dark:text-white w-full">Yazar Listesi</h1>
                <hr class="w-full mb-[12px]">
                <div class="w-full flex flex-col gap-[10px]">
                    <div v-for="writer in writers" :key="writer._id" class="w-full flex items-center justify-between relative text-[18px] text-center px-[18px] py-[6px] bg-main-shadow border-[2px] rounded-[8px] border-main">
                        <span class="w-[30px]">Düzenle</span>
                        <span>{{ writer.name }}</span>
                        <span class="w-[30px]">Sil</span>
                    </div>
                    <div class="w-full flex items-center justify-center relative text-[18px] text-center px-[18px] py-[6px] bg-main-shadow border-[2px] rounded-[8px] border-main">
                        <div class="border-main border-[2px] rounded-[50%] text-main bg-white w-[30px] h-[30px] shadow-sm shadow-main flex justify-center items-center">
                            <font-awesome-icon icon="fa-solid fa-plus" size="lg"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div data-number="3" class="settingsContent w-full flex-col gap-[20px] py-[20px]">
            <div class="w-full flex flex-col items-center justify-center gap-[10px] px-[20px]">
                <h1 class="text-[20px] text-main dark:text-white w-full">Kategoriler</h1>
                <hr class="w-full mb-[12px]">
                <div class="flex items-center justify-center gap-[10px] flex-wrap p-[10px]">
                    <div v-for="category in categories" :key="category._id" class="itemCard w-[360px] h-[120px] rounded-[10px] overflow-hidden cursor-pointer relative">
                        <img :src="getImageFromUploads(`categories/${category.img}`)" :alt="category.title" class="w-full h-full object-cover">
                        <button class="gelatine deleteItem absolute top-[4px] right-[4px] py-[4px] px-[10px] text-white bg-red-600 rounded-[10px]"><font-awesome-icon icon="fa-solid fa-trash-can" size="lg"/></button>
                    </div>
                    <div class="w-[360px] h-[120px] rounded-[10px] overflow-hidden border-[1px] border-main bg-main-shadow flex justify-center items-center cursor-pointer">
                        <div class="border-main border-[2px] rounded-[50%] text-main bg-white w-[50px] h-[50px] shadow-sm shadow-main flex justify-center items-center">
                            <font-awesome-icon icon="fa-solid fa-plus" size="2xl"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div data-number="4" class="settingsContent w-full flex-col gap-[20px] py-[20px]">
            <div class="w-full flex flex-col items-center justify-center gap-[10px] px-[20px]">
                <h1 class="text-[20px] text-main dark:text-white w-full">Yayınevi Listesi</h1>
                <hr class="w-full mb-[12px]">
                <div class="w-full flex flex-col gap-[10px]">
                    <div v-for="publisher in publishers" :key="publisher._id" class="w-full flex items-center justify-between relative text-[18px] text-center px-[18px] py-[6px] bg-main-shadow border-[2px] rounded-[8px] border-main">
                        <span class="w-[30px]">Düzenle</span>
                        <span>{{ publisher.name }}</span>
                        <span class="w-[30px]">Sil</span>
                    </div>
                    <div class="w-full flex items-center justify-center relative text-[18px] text-center px-[18px] py-[6px] bg-main-shadow border-[2px] rounded-[8px] border-main">
                        <div class="border-main border-[2px] rounded-[50%] text-main bg-white w-[30px] h-[30px] shadow-sm shadow-main flex justify-center items-center">
                            <font-awesome-icon icon="fa-solid fa-plus" size="lg"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .settingsContent {
        display: none;
    }
    .adminTabs span {
        cursor: pointer;
        color: #2894B5;
        padding: 4px 12px;
        border: 1px solid #2894B5;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 2px 2px 8px #2894B55e;
    }
    .adminTabs span.selected {
        background-color: #2894B5;
        color: white;
    }
    .dark .adminTabs span {
        cursor: pointer;
        color: #EEC681;
        padding: 4px 12px;
        border: 1px solid #EEC681;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 2px 2px 8px #EEC6815e;
    }
    .dark .adminTabs span.selected {
        background-color: #EEC681;
        color: white;
    }
</style>