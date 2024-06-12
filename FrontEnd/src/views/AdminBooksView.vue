<script setup>
    import { ref, onMounted } from 'vue';

    //Ready
    onMounted(() => {
        //Requests
        // getCategories();
        // getWriters();
        // getPublishers();
        // getBooks();
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
            Kitaplar
        </div>
        <div data-number="2" class="settingsContent w-full flex-col gap-[20px] py-[20px]">
            Yazarlar
        </div>
        <div data-number="3" class="settingsContent w-full flex-col gap-[20px] py-[20px]">
            Kategoriler
        </div>
        <div data-number="4" class="settingsContent w-full flex-col gap-[20px] py-[20px]">
            Yayınevleri
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