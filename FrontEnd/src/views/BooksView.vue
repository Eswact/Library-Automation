<script setup>
    import { ref, onMounted, onBeforeUnmount} from 'vue';
    import AjaxScripts from '../scripts/ajaxScripts.js';
    import { getImageFromUploads, getCategoryFromId } from '../scripts/common.js';

    const books = ref([]);
    const categories = ref([]);
    function getBooks() {
        let onSuccess = (res) => {
            console.log(res);
            books.value = res; 
        };
        let onError = (err) => {
            console.log(err);
        };
        AjaxScripts.GetBooks({onSuccess, onError});
    }
    function getCategories() {
        let onSuccess = (res) => {
            console.log(res);
            categories.value = res; 
        };
        let onError = (err) => {
            console.log(err);
        };
        AjaxScripts.GetCategories({onSuccess, onError});
    }
    onMounted(() => {
        getCategories();
        getBooks();
    });
</script>

<template>
    <div class="w-full px-[20px] flex">
        <div class="fixed flex flex-col gap-[12px] items-center justify-start w-[235px] pt-[24px] pb-[34px] border-[1px] border-black dark:border-white shadow-md dark:shadow-lg dark:shadow-[rgba(225,225,225,0.55)] rounded-[10px] px-[18px] md:hidden">
            <button class="w-full px-[12px] py-[6px] border-[1px] border-second-shadow bg-second text-white text-[18px] font-semibold shadow-md shadow-second-shadow rounded-[8px] mb-[12px]">Temizle</button>
            <div class="w-full flex flex-col px-[12px] pt-[8px] pb-[12px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[8px]">
                <label for="writerSelect" class="text-[18px] font-semibold">Kitap</label>
                <input type="text" placeholder="Kitap adı" class="w-full border-[1px] px-[4px] py-[2px] border-[#ddd] rounded-[4px] text-center dark:text-black">
            </div>
            <div class="w-full flex flex-col px-[12px] pt-[8px] pb-[12px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[8px]">
                <label for="writerSelect" class="text-[18px] font-semibold">Yazar</label>
                <select name="writerSelect" id="writerSelect" class="w-full border-[1px] border-[#ddd] dark:text-black rounded-[4px] px-[4px] py-[2px]">
                    <option value="">Seçim yapınız</option>
                </select>
            </div>
            <div class="w-full flex flex-col px-[12px] pt-[8px] pb-[12px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[8px]">
                <label for="categorySelect" class="text-[18px] font-semibold">Kategori</label>
                <select name="categorySelect" id="categorySelect" class="w-full border-[1px] border-[#ddd] dark:text-black rounded-[4px] px-[4px] py-[2px]">
                    <option value="">Seçim yapınız</option>
                </select>
            </div>
            <div class="w-full flex flex-col px-[12px] pt-[8px] pb-[12px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[8px]">
                <label for="publisherSelect" class="text-[18px] font-semibold">Yayınevi</label>
                <select name="publisherSelect" id="publisherSelect" class="w-full border-[1px] border-[#ddd] dark:text-black rounded-[4px] px-[4px] py-[2px]">
                    <option value="">Seçim yapınız</option>
                </select>
            </div>
            <div class="w-full flex px-[12px] py-[10px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[16px]">
                <input type="checkbox" id="canRent" class="scale-[1.85]">
                <label for="canRent" class="text-[18px] font-semibold">Kiralanabilir</label>
            </div>
        </div>
        <div class="w-full pl-[250px] pr-[10px] md:pl-[10px] flex items-center gap-[20px] flex-wrap">
            <div v-for="book in books" :key="book.id" >
                <div v-if="book.isBorrowed" class="relative dark:bg-[rgba(155,155,155,0.55)] w-[226px] h-[292px] p-[16px] border-[2px] border-[rgba(155,155,155,0.75)] rounded-[12px] shadow-md shadow-[rgba(155,155,155,0.55)] flex flex-col justify-center items-center gap-[8px]">
                    <div class="absolute top-[4px] w-full px-[12px] flex justify-between items-center text-[14px] font-semibold">
                        <span v-if="(categories.find(x => x.catId == book.category) != null)">{{ categories.find(x => x.catId == book.category).name }}</span>
                        <span v-else>Diğer</span>
                    </div>
                    <img :src="getImageFromUploads(`books/${book.images[0]}`)" :alt=book.name class="h-[150px] max-w-full rounded-[5px] grayscale">
                    <span :title=book.name class="text-[18px] font-semibold text-center">{{ book.name }}</span>
                    <span class="absolute bottom-[4px] text-[16px] font-semibold text-red-800">Mevcut Değil</span>
                </div>
                <div v-else class="relative dark:bg-main-shadow cursor-pointer w-[226px] h-[292px] p-[16px] border-[2px] border-main rounded-[12px] shadow-md shadow-main-shadow flex flex-col justify-center items-center gap-[8px]">
                    <div class="absolute top-[4px] w-full px-[12px] flex justify-between items-center text-[14px] font-semibold">
                        <span v-if="(categories.find(x => x.catId == book.category) != null)">{{ categories.find(x => x.catId == book.category).name }}</span>
                        <span v-else>Diğer</span>
                    </div>
                    <img :src="getImageFromUploads(`books/${book.images[0]}`)" :alt=book.name class="h-[150px] max-w-full rounded-[5px]">
                    <span :title=book.name class="text-[18px] font-semibold text-center overflow-hidden max-w-[191px] max-h-[55px]">{{ book.name }}</span>
                    <span class="absolute bottom-[4px] text-[14px] font-semibold text-second">Detaylar için tıkla</span>
                </div>
            </div>
        </div>
    </div>
</template>