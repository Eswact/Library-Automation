<script setup>
    import { ref, onMounted, onBeforeUnmount} from 'vue';
    import AjaxScripts from '../scripts/ajaxScripts.js';
    import { getImageFromUploads } from '../scripts/common.js';

    const books = ref([]);
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
    onMounted(() => {
        getBooks();
    });
</script>

<template>
    <div class="w-full max-w-[100rem] px-[20px] flex">
        <div class="fixed w-[235px] h-[700px] border-[1px] border-black dark:border-white shadow-md rounded-[10px] p-[20px] md:hidden">
            filtreler
        </div>
        <div class="w-full pl-[250px] pr-[10px] md:pl-[10px]">
            <div v-for="book in books" :key="book.id" >
                <div class="w-[172px] h-[220px] p-[20px] border-[2px] border-main rounded-[12px] shadow-md shadow-main-shadow flex flex-col justify-center items-center gap-[10px]">
                    <span class="text-[20px]">{{ book.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>