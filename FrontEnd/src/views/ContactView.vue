<script setup>
    import { ref, onMounted, watch, onBeforeUnmount} from 'vue';
    import AjaxScripts from '../scripts/ajaxScripts.js';
    import { getImageFromUploads } from '../scripts/common.js';

    const contact = ref({});

    function getCompanyInfos() {
        let onSuccess = (res) => {
            contact.value = res.contact;
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
    <div class="w-full p-[20px] flex md:flex-col md:gap-[20px] items-center justify-center">
        <div class="w-[50%] md:w-full h-[720px] md:h-[auto] p-[20px] md:p-0 flex items-center justify-center">
            <a href="#" target="_blank" class="w-full border-[1px] rounded-[12px] overflow-hidden flex justify-center items-center">
                <img class="w-full h-full" :src="getImageFromUploads(`company/${contact.img}`)" alt="adres"/>
            </a>
        </div>
        <div class="w-[50%] md:w-full flex flex-col gap-[16px] px-[20px] sm:px-[0]">
            <h2 class="w-full text-center text-[24px] border-b-[1px] pb-[4px]">İletişime Geçin</h2>
            <div class="px-[20px] flex flex-col justify-center gap-[10px] text-[18px] w-full md:w-full md:px-[2px] md:py-[2px]">
                <div class="w-full py-[10px] px-[12px] flex flex-col gap-[18px] md:px-0">
                <div class="w-full flex items-center justify-start gap-[8px] "><span class="text-second min-w-[60px] text-center"><font-awesome-icon icon="fa-solid fa-phone" size="xl"/></span><span class="text-main dark:text-white"> {{contact.tel}}</span></div>
                <div class="w-full flex items-center justify-start gap-[8px] "><span class="text-second min-w-[60px] text-center"><font-awesome-icon icon="fa-solid fa-envelope" size="xl"/></span><span class="text-main dark:text-white"> {{contact.mail}}</span></div>
                <div class="w-full flex items-center justify-start gap-[8px] "><span class="text-second min-w-[60px] text-center"><font-awesome-icon icon="fa-solid fa-location-dot" size="xl"/></span><span class="text-main dark:text-white"> {{contact.address}}</span></div>
                </div>
            </div>
            <div class="w-full px-[10px]">
                <div class="w-full flex flex-col items-start gap-[20px] md:flex-col-reverse">
                    <form  class="flex flex-col gap-[16px] w-full md:w-full px-[28px] py-[20px] border-[1px] border-main rounded-[10px] bg-main-shadow shadow-lg shadow-main-shadow">
                        <div class="flex flex-col gap-[10px] w-full">
                            <label class="text-[12px] font-semibold text-main dark:text-white" for="name">Adınız Soyadınız</label>
                            <input class="w-full p-[10px] border border-main dark:border-white rounded-md" type="text" id="name" name="name" placeholder="Adınız Soyadınız" required>
                        </div>
                        <div class="flex flex-col gap-[10px] w-full">
                            <label class="text-[12px] font-semibold text-main dark:text-white" for="email">E-Posta Adresiniz</label>
                            <input class="w-full p-[10px] border border-main dark:border-white rounded-md" type="email" id="email" name="email" placeholder="E-Posta Adresiniz" required>
                        </div>
                        <div class="flex flex-col gap-[10px] w-full">
                            <label class="text-[12px] font-semibold text-main dark:text-white" for="message">Mesajınız</label>
                            <textarea class="w-full p-[10px] min-h-[110px] border border-main dark:border-white rounded-md" id="message" name="message" placeholder="Mesajınız" required></textarea>
                        </div>
                        <div class="flex justify-end">
                            <button type="submit" class="gelatine w-full lg:w-full p-[8px] bg-second text-white text-[18px] font-[600] rounded-md">Gönder</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>