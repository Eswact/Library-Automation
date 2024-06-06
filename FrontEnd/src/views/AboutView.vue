<script setup>
    import { ref, onMounted, watch, onBeforeUnmount} from 'vue';
    import AjaxScripts from '../scripts/ajaxScripts.js';
    import { getImageFromUploads } from '../scripts/common.js';

    const company = ref({});

    function getCompanyInfos() {
        let onSuccess = (res) => {
            company.value = res.about;
        };
        let onError = (err) => {
            console.log(err);
        };
        AjaxScripts.GetCompanyInfos({onSuccess, onError});
    }
    onMounted(() => {
        getCompanyInfos();
    }); 
</script>

<template>
    <div class="w-full px-[20px]">
        <div class="w-full flex lg:flex-col items-start gap-[20px]">
            <img :src="getImageFromUploads(`company/${company.img}`)" class="w-[60%] h-[85vh] lg:w-full lg:h-[auto] lg:max-h-[370px] object-cover rounded-[10px] border-[1px]">
            <div class="w-full flex lg:flex-col-reverse items-start gap-[20px]">
                <div class="w-full flex flex-col gap-[20px] items-start text-justify">
                <h1 class="text-[1.75rem] xl:text-[1.5rem] md:text-[1.25rem] font-medium text-main dark:text-second w-full pb-[4px] border-b-[1px] border-main-shadow dark:border-second-shadow">{{company.header}}</h1>
                <span class="text-[1.25rem] md:text-[1.1rem] text-main leading-[40px] pt-[10px] pr-[30px] md:pt-[0px] md:pr-[4px] md:pl-[4px] dark:text-white">{{company.description}}</span>
                <h1 class="text-[1.75rem] xl:text-[1.5rem] md:text-[1.25rem] font-medium text-main dark:text-second w-full pb-[4px] border-b-[1px] border-main-shadow dark:border-second-shadow">Vizyonumuz</h1>
                <span class="text-[1.25rem] md:text-[1.1rem] text-main leading-[40px] pt-[10px] pr-[30px] md:pt-[0px] md:pr-[4px] md:pl-[4px] dark:text-white">{{company.vision}}</span>
                <h1 class="text-[1.75rem] xl:text-[1.5rem] md:text-[1.25rem] font-medium text-main dark:text-second w-full pb-[4px] border-b-[1px] border-main-shadow dark:border-second-shadow">Misyonumuz</h1>
                <span class="text-[1.25rem] md:text-[1.1rem] text-main leading-[40px] pt-[10px] pr-[30px] md:pt-[0px] md:pr-[4px] md:pl-[4px] dark:text-white">{{company.mission}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
