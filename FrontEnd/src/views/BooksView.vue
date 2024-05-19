<script setup>
    import { ref, onMounted, watch, onBeforeUnmount} from 'vue';
    import AjaxScripts from '../scripts/ajaxScripts.js';
    import { getImageFromUploads, getCategoryFromId } from '../scripts/common.js';

    const books = ref([]);
    const writers = ref([]);
    const categories = ref([]);
    const publishers = ref([]);
    const originalBooks = ref([]);
    const searchBook = ref('');
    const selectedWriter = ref(0);
    const selectedCategory = ref(0);
    const selectedPublisher = ref(0);
    const canRent = ref(false);
    function getBooks() {
        let onSuccess = (res) => {
            books.value = res;
            originalBooks.value = res;
        };
        let onError = (err) => {
            console.log(err);
        };
        AjaxScripts.GetBooks({onSuccess, onError});
    }
    function getWriters() {
        let onSuccess = (res) => {
            writers.value = res; 
        };
        let onError = (err) => {
            console.log(err);
        };
        AjaxScripts.GetWriters({onSuccess, onError});
    }
    function getCategories() {
        let onSuccess = (res) => {
            categories.value = res; 
        };
        let onError = (err) => {
            console.log(err);
        };
        AjaxScripts.GetCategories({onSuccess, onError});
    }
    function getPublishers() {
        let onSuccess = (res) => {
            publishers.value = res; 
        };
        let onError = (err) => {
            console.log(err);
        };
        AjaxScripts.GetPublishers({onSuccess, onError});
    }
    const fetchDatas = async function(){
        await getBooks();
        await getWriters();
        await getCategories();
        await getPublishers();
    }
    function applyFilters() {
        let filteredBooks = originalBooks.value;
        console.log(filteredBooks);
        if (searchBook.value != '') {
            filteredBooks = filteredBooks.filter(x => x.name.toLowerCase().includes(searchBook.value.toLowerCase()));
        }
        if (selectedWriter.value != 0) {
            filteredBooks = filteredBooks.filter(x => x.writer == selectedWriter.value);
        }
        if (selectedCategory.value != 0) {
            filteredBooks = filteredBooks.filter(x => x.category == selectedCategory.value);
        }
        if (selectedPublisher.value != 0) {
            filteredBooks = filteredBooks.filter(x => x.publisher == selectedPublisher.value);
        }
        if (canRent.value) {
            filteredBooks = filteredBooks.filter(x => x.isBorrowed == false);
        }
        books.value = filteredBooks;
    }
    function clearFilter() {
        searchBook.value = '';
        selectedWriter.value = 0;
        selectedCategory.value = 0;
        selectedPublisher.value = 0;
        canRent.value = false;
        applyFilters();
    }

    onMounted(() => {
        fetchDatas().then(() => {
            watch([searchBook, selectedWriter, selectedCategory, selectedPublisher, canRent], () => {
                applyFilters();
            });
        });
        applyFilters();
    }); 
</script>

<template>
    <div class="w-full px-[20px] flex">
        <div class="fixed flex flex-col gap-[12px] items-center justify-start w-[235px] pt-[24px] pb-[34px] border-[1px] border-black dark:border-white shadow-md dark:shadow-lg dark:shadow-[rgba(225,225,225,0.55)] rounded-[10px] px-[18px] md:hidden">
            <button @click="clearFilter()" class="w-full px-[12px] py-[6px] border-[1px] border-second-shadow bg-second text-white text-[18px] font-semibold shadow-md shadow-second-shadow rounded-[8px] mb-[12px]">Temizle</button>
            <div class="w-full flex flex-col px-[12px] pt-[8px] pb-[12px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[8px]">
                <label for="writerSelect" class="text-[18px] font-semibold">Kitap</label>
                <input v-model="searchBook" id="searchBook" type="text" placeholder="Kitap adı" class="w-full border-[1px] px-[4px] py-[2px] border-[#ddd] rounded-[4px] text-center dark:text-black">
            </div>
            <div class="w-full flex flex-col px-[12px] pt-[8px] pb-[12px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[8px]">
                <label for="writerSelect" class="text-[18px] font-semibold">Yazar</label>
                <select v-model="selectedWriter" name="writerSelect" id="writerSelect" class="w-full border-[1px] border-[#ddd] dark:text-black rounded-[4px] px-[4px] py-[2px]">
                    <option class="p-[4px] border-b-[1px] border-black" value=0>Seçim yapınız</option>
                    <option class="p-[4px] border-b-[1px] border-black" v-for="writer in writers" :key="writer.writerId" :value="writer.writerId">{{ writer.name }}</option>
                </select>
            </div>
            <div class="w-full flex flex-col px-[12px] pt-[8px] pb-[12px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[8px]">
                <label for="categorySelect" class="text-[18px] font-semibold">Kategori</label>
                <select v-model="selectedCategory" name="categorySelect" id="categorySelect" class="w-full border-[1px] border-[#ddd] dark:text-black rounded-[4px] px-[4px] py-[2px]">
                    <option value=0>Seçim yapınız</option>
                    <option v-for="category in categories" :key="category.catId" :value="category.catId">{{ category.name }}</option>
                </select>
            </div>
            <div class="w-full flex flex-col px-[12px] pt-[8px] pb-[12px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[8px]">
                <label for="publisherSelect" class="text-[18px] font-semibold">Yayınevi</label>
                <select v-model="selectedPublisher" name="publisherSelect" id="publisherSelect" class="w-full border-[1px] border-[#ddd] dark:text-black rounded-[4px] px-[4px] py-[2px]">
                    <option value=0>Seçim yapınız</option>
                    <option v-for="publisher in publishers" :key="publisher.publisherId" :value="publisher.publisherId">{{ publisher.name }}</option>
                </select>
            </div>
            <div class="w-full flex px-[12px] py-[10px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[16px]">
                <input v-model="canRent" type="checkbox" id="canRent" class="scale-[1.85]">
                <label for="canRent" class="text-[18px] font-semibold">Kiralanabilir</label>
            </div>
        </div>
        <div class="w-full pl-[250px] pr-[10px] md:pl-[10px] flex items-center gap-[20px] flex-wrap">
            <div v-for="book in books" :key="book.id" >
                <div v-if="book.isBorrowed" class="relative dark:bg-[rgba(155,155,155,0.55)] w-[220px] h-[270px] p-[16px] border-[2px] border-[rgba(155,155,155,0.75)] rounded-[12px] shadow-md shadow-[rgba(155,155,155,0.55)] flex flex-col justify-center items-center gap-[8px]">
                    <div class="absolute top-[4px] w-full px-[12px] flex justify-between items-center text-[14px] font-semibold">
                        <span v-if="(categories.find(x => x.catId == book.category) != null)">{{ categories.find(x => x.catId == book.category).name }}</span>
                        <span v-else>Diğer</span>
                    </div>
                    <img :src="getImageFromUploads(`books/${book.images[0]}`)" :alt=book.name class="h-[150px] max-w-full rounded-[5px] grayscale">
                    <span :title=book.name class="text-[18px] font-semibold text-center truncate max-w-full">{{ book.name }}</span>
                    <span class="absolute bottom-[4px] text-[16px] font-semibold text-red-800">Mevcut Değil</span>
                </div>
                <div v-else class="relative dark:bg-main-shadow cursor-pointer w-[220px] h-[270px] p-[16px] border-[2px] border-main rounded-[12px] shadow-md shadow-main-shadow flex flex-col justify-center items-center gap-[8px]">
                    <div class="absolute top-[4px] w-full px-[12px] flex justify-between items-center text-[14px] font-semibold">
                        <span v-if="(categories.find(x => x.catId == book.category) != null)">{{ categories.find(x => x.catId == book.category).name }}</span>
                        <span v-else>Diğer</span>
                    </div>
                    <img :src="getImageFromUploads(`books/${book.images[0]}`)" :alt=book.name class="h-[150px] max-w-full rounded-[5px]">
                    <span :title=book.name class="text-[18px] font-semibold text-center truncate max-w-full">{{ book.name }}</span>
                    <span class="absolute bottom-[4px] text-[14px] font-semibold text-second">Detaylar için tıkla</span>
                </div>
            </div>
        </div>
    </div>
</template>