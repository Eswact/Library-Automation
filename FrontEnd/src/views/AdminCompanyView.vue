<script setup>
    import AjaxScripts from '@/scripts/ajaxScripts';
    import { ref, onMounted } from 'vue';
    import { getImageFromUploads } from '@/scripts/common.js';

    const banners = ref([]);
    const contactData = ref({});
    const aboutData = ref({});
    const selectedImage = ref(null);
    const selectedImageContact = ref(null);
    const selectedImageAbout = ref(null);

    function getBanners() {
        let onSuccess = (res) => {
            console.log(res);
            banners.value = res; 
        };
        let onError = (err) => {
            console.log(err);
        };
        AjaxScripts.GetBanners({onSuccess, onError});
    }
    function getCompanyInfos() {
        let onSuccess = (res) => {
            contactData.value = res.contact;
            aboutData.value = res.about;
            selectedImageContact.value = getImageFromUploads(`company/${res.contact.img}`);
            selectedImageAbout.value = getImageFromUploads(`company/${res.about.img}`);
        };
        let onError = (err) => {
            console.log(err);
        };
        AjaxScripts.GetCompanyInfos({onSuccess, onError});
    }


    //Ready
    onMounted(() => {
        //Requests
        getBanners();
        getCompanyInfos();
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

    const saveNewBanner = () => {
        let control = controlInputs();
        const file = document.getElementById('fileInputBanner').files[0];
        console.log('name -> ', file.name);
        if (control && file) {
            let data = {
                file: file
            };
            let onSuccess = (res) => {
                console.log('Başarılı');
            };
            let onError = (err) => {
                console.error('Bir hata oluştu:', err);
            };
            AjaxScripts.SaveBannerImg({data, onSuccess, onError});

            let data2 = {
                img: file.name,
                title: document.getElementById('bannerHeader').value,
                description: document.getElementById('bannerDescription').value
            };
            let onSuccess2 = (res) => {
                getBanners();
                alert("Yeni Afiş Eklendi");
            };
            let onError2 = (err) => {
                alert("Yeni Afiş Eklenirken Hata");
            };
            AjaxScripts.AddBanner({data: data2, onSuccess: onSuccess2, onError: onError2});
            closeBannerModal();
        }
        else {
            alert("Lütfen tüm alanları doldurunuz.");
        }
    };
    const deleteBanner = (bannerId) => {
        let data = bannerId;
        let onSuccess = (res) => {
            alert("Afiş Kaldırıldı");
            getBanners();
        };
        let onError = (err) => {
            alert("Afiş Kaldırılırken Hata");
        };
        AjaxScripts.DeleteBanner({data, onSuccess, onError});
    };
    const openBannerModal = () => {
        document.getElementById('bannerModal').classList.add('open');
    };
    const closeBannerModal = () => {
        document.getElementById('bannerModal').classList.remove('open');
        selectedImage.value = null;
        resetFormInputs();
    };

    const updateAbout = () => {
        const fileAbout = document.getElementById('fileInputAbout').files[0];
        if (fileAbout) {
            let data = {
                file: fileAbout
            };
            let onSuccess = (res) => {
                console.log('Başarılı');
            };
            let onError = (err) => {
                console.error('Bir hata oluştu:', err);
            };
            AjaxScripts.SaveCompanyImg({data, onSuccess, onError});
        }
        let data = {
            about: {
                header: document.getElementById('aboutHeader').value,
                description: document.getElementById('companyAbout').value,
                vision: document.getElementById('aboutVision').value,
                mission: document.getElementById('aboutMision').value,
                img: fileAbout ? fileAbout.name : aboutData.value.img
            }
        };
        let onSuccess = (res) => {
            alert("Kütüphane Bilgileri Güncellendi");
            getCompanyInfos();
        };
        let onError = (err) => {
            alert("Kütüphane Bilgileri Güncellenirken Hata");
        };
        AjaxScripts.UpdateCompanyInfos({data, onSuccess, onError});
    }
    const updateContact = () => {
        const fileContact = document.getElementById('fileInputContact').files[0];
        if (fileContact) {
            let data = {
                file: fileContact
            };
            let onSuccess = (res) => {
                console.log('Başarılı');
            };
            let onError = (err) => {
                console.error('Bir hata oluştu:', err);
            };
            AjaxScripts.SaveCompanyImg({data, onSuccess, onError});
        }
        let data = {
            contact: {
                tel: document.getElementById('companyTel').value,
                mail: document.getElementById('companyMail').value,
                address: document.getElementById('companyAddress').value,
                img: fileContact ? fileContact.name : contactData.value.img,
                link: document.getElementById('companyLink').value
            },
        };
        let onSuccess = (res) => {
            alert("Kütüphane Bilgileri Güncellendi");
            getCompanyInfos();
        };
        let onError = (err) => {
            alert("Kütüphane Bilgileri Güncellenirken Hata");
        };
        AjaxScripts.UpdateCompanyInfos({data, onSuccess, onError});
    }
    const clearContact = () => {
        selectedImageContact.value = null;
        document.getElementById('fileInputContact').value = null;
    };
    const clearAbout = () => {
        selectedImageAbout.value = null;
        document.getElementById('fileInputAbout').value = null;
    };

    function isVisible(element) {
        return element.offsetWidth > 0 || element.offsetHeight > 0;
    }
    function controlInputs() {
        var requiredInputs = document.querySelectorAll('.requiredInputs');
        var requiredSelects = document.querySelectorAll('.requiredSelects');
        for (var i = 0; i < requiredInputs.length; i++) {
            if (isVisible(requiredInputs[i])) {
                if (requiredInputs[i].value === null || requiredInputs[i].value.trim() === "") {
                    return false;
                }
            }
        }
        for (var j = 0; j < requiredSelects.length; j++) {
            if (isVisible(requiredSelects[j])) {
                if (requiredSelects[j].value == "0") {
                    return false;
                }
            }
        }
        return true;
    }

    const triggerFileInput = (event) => {
        if (document.getElementById('bannerModal').classList.contains('open')) {
            document.getElementById('fileInputBanner').click();
        }
        if (event.target == document.getElementById('ContactImage')) {
            document.getElementById('fileInputContact').click();
        }
        if (event.target == document.getElementById('AboutImage')) {
            document.getElementById('fileInputAbout').click();
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        handleImage(file, event.target);
    };
    const handleDragOver = (event) => {
        event.dataTransfer.dropEffect = 'copy';
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        
        const inputElement = event.target.closest('.containImageSelector').querySelector('input[type="file"]');
        if (inputElement) {
            inputElement.files = event.dataTransfer.files;
        }

        handleImage(file, event.target);
    }; 
    const handleImage = (file, target) => {
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            if (target == document.getElementById('ContactImage') || target == document.getElementById('fileInputContact')) {
                selectedImageContact.value = e.target.result;
            }
            else if (target == document.getElementById('AboutImage') || target == document.getElementById('fileInputAbout')) {
                selectedImageAbout.value = e.target.result;
            }
            else {
                selectedImage.value = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    };
    const resetFormInputs = () => {
        document.querySelectorAll('.formInputs').forEach(function (e) {
            e.value = null;
        });
        document.querySelectorAll('.formSelects').forEach(function (e) {
            e.value = 0;
        });
    };
</script>

<template>
    <div class="w-full dark:text-black">
        <div class="adminTabs w-full flex items-center justify-around p-[16px] text-[18px] md:px-0 sm:flex-col sm:gap-[14px]">
            <span class="sm:w-[200px] text-center" data-number="1">Afişler</span>
            <span class="sm:w-[200px] text-center"  data-number="2">Hakkımızda</span>
            <span class="sm:w-[200px] text-center" data-number="3">İletişim</span>
        </div>
        <div data-number="1" class="settingsContent w-full flex-col gap-[20px]">
            <div class="w-full flex flex-col items-center justify-center gap-[10px] px-[20px]">
                <h1 class="text-[20px] text-main dark:text-white w-full">Afişler</h1>
                <hr class="w-full mb-[12px]">
                <div class="flex items-center justify-center gap-[10px] flex-wrap p-[10px]">
                    <div v-for="banner in banners" :key="banner._id" class="itemCard w-[360px] h-[120px] rounded-[10px] overflow-hidden cursor-pointer relative">
                        <img :src="getImageFromUploads(`banners/${banner.img}`)" :alt="banner.title" class="w-full h-full object-cover">
                        <button @click="deleteBanner(banner._id)" class="gelatine deleteItem absolute top-[4px] right-[4px] py-[4px] px-[10px] text-white bg-red-600 rounded-[10px]"><font-awesome-icon icon="fa-solid fa-trash-can" size="lg"/></button>
                    </div>
                    <div @click="openBannerModal" class="w-[360px] h-[120px] rounded-[10px] overflow-hidden border-[1px] border-main bg-main-shadow flex justify-center items-center cursor-pointer">
                        <div class="border-main border-[2px] rounded-[50%] text-main bg-white w-[50px] h-[50px] shadow-sm shadow-main flex justify-center items-center">
                            <font-awesome-icon icon="fa-solid fa-plus" size="2xl"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div data-number="2" class="settingsContent w-full flex-col gap-[20px]">
            <div class="w-full flex flex-col items-center justify-center gap-[10px] px-[20px]">
                <h1 class="text-[20px] text-main dark:text-white w-full">Hakkımızda</h1>
                <hr class="w-full mb-[12px]">
                <div v-if="aboutData" class="containImageSelector w-full">
                    <div class="w-full px-[5%] flex justify-center items-center gap-[10px] sm:flex-col">
                        <div class="w-[30%] h-[538px] overflow-hidden sm:w-full">
                            <input type="file" id="fileInputAbout" ref="fileInputAbout" @change="handleFileChange" class="formInputs hidden" accept=".jpg, .jpeg, .png, .webp">
                            <div id="AboutImage" class="w-full h-full border-[1px] rounded-[6px] flex justify-center items-center cursor-pointer" @click="triggerFileInput" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
                                <div v-if="!selectedImageAbout" class="flex flex-col gap-[10px] justify-center items-center text-center text-second">
                                    <span class="text-[18px]">Resim seçin veya sürükleyip bırakın</span>
                                    <font-awesome-icon icon="fa-solid fa-upload" size="xl" />
                                </div>
                                <div v-else class="w-full h-full rounded-[6px] overflow-hidden relative">
                                    <button @click="clearAbout()" class="gelatine clearItem absolute top-[8px] right-[8px] py-[8px] px-[12px] text-white bg-red-600 rounded-[10px]"><font-awesome-icon :icon="['fas', 'trash-can']" size="xl"/></button>
                                    <img :src="selectedImageAbout" alt="Contact" class="w-full h-full object-cover">
                                </div>
                            </div>
                        </div>
                        <div class="w-[50%] sm:w-full flex flex-col gap-[10px]">
                            <input :value="aboutData.header" type="text" id="aboutHeader" placeholder="Başlık" class="border-[1px] rounded-[6px] py-[6px] px-[12px]">
                            <textarea :value="aboutData.description" id="companyAbout" placeholder="Hakkında" class="border-[1px] rounded-[6px] px-[12px] py-[6px] min-h-[155px]"></textarea>
                            <textarea :value="aboutData.vision" id="aboutVision" placeholder="Vizyonumuz" class="border-[1px] rounded-[6px] px-[12px] py-[6px] min-h-[155px]"></textarea>
                            <textarea :value="aboutData.mission" id="aboutMision" placeholder="Misyonumuz" class="border-[1px] rounded-[6px] px-[12px] py-[6px] min-h-[155px]"></textarea>
                        </div>
                    </div>
                </div>
                <button @click="updateAbout()" class="w-[75%] sm:w-[95%] mt-[8px] pb-[8px] pt-[4px] border-[1px] rounded-[20px] border-second-shadow shadow-md shadow-second-shadow bg-second text-white text-[22px] font-bold">Kaydet</button>
            </div>
        </div>
        <div data-number="3" class="settingsContent w-full flex-col gap-[20px]">
            <div class="w-full flex flex-col items-center justify-center gap-[10px] px-[20px]">
                <h1 class="text-[20px] w-full text-main dark:text-white">İletişim</h1>
                <hr class="mb-[10px] w-full">
                <div v-if="contactData" class="containImageSelector flex sm:flex-col items-center gap-[20px] px-[15%] md:px-[20px] py-[10px] w-full">
                    <div class="flex justify-center items-center flex-col gap-[10px] w-full">
                        <input type="file" id="fileInputContact" ref="fileInputContact" @change="handleFileChange" class="formInputs hidden" accept=".jpg, .jpeg, .png, .webp">
                        <div id="ContactImage" class="w-full max-w-[500px] h-[260px] border-[1px] rounded-[6px] flex justify-center items-center cursor-pointer" @click="triggerFileInput" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
                            <div v-if="!selectedImageContact" class="flex flex-col gap-[10px] justify-center items-center text-center text-second">
                                <span class="text-[18px]">Resim seçin veya sürükleyip bırakın</span>
                                <font-awesome-icon icon="fa-solid fa-upload" size="xl" />
                            </div>
                            <div v-else class="w-full h-full rounded-[6px] overflow-hidden relative">
                                <button @click="clearContact()" class="gelatine clearItem absolute top-[8px] right-[8px] py-[8px] px-[12px] text-white bg-red-600 rounded-[10px]"><font-awesome-icon :icon="['fas', 'trash-can']" size="xl"/></button>
                                <img :src="selectedImageContact" alt="Contact" class="w-full h-full object-cover">
                            </div>
                        </div>
                        <input :value="contactData.link" type="text" id="companyLink" placeholder="Link" class="w-full max-w-[500px] border-[1px] rounded-[6px] px-[12px] py-[4px]">
                    </div>
                    <div class="flex flex-col justify-center items-center gap-[20px] w-full">
                        <input :value="contactData.tel" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}" id="companyTel" placeholder="Telefon" class="w-full max-w-[500px] border-[1px] rounded-[6px] px-[12px] py-[4px]">
                        <input :value="contactData.mail" type="email" id="companyMail" placeholder="Email" class="w-full max-w-[500px] border-[1px] rounded-[6px] px-[12px] py-[4px]">
                        <textarea :value="contactData.address" id="companyAddress" placeholder="Adres" class="w-full max-w-[500px] border-[1px] rounded-[6px] px-[12px] py-[6px] min-h-[192px] sm:min-h-[80px]"></textarea>
                    </div>
                </div>
                <button @click="updateContact()" class="w-[70%] md:w-[95%] mt-[8px] pb-[8px] pt-[4px] border-[1px] rounded-[20px] border-second-shadow shadow-md shadow-second-shadow bg-second text-white text-[22px] font-bold">Kaydet</button>
            </div>
        </div>

        <div id="bannerModal" class="z-40 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] justify-center items-center">
            <div class="bg-white w-[800px] rounded-[10px] relative border-[1px] border-main-shadow shadow-lg shadow-main-shadow max-w-[95%]">
                <div class="justify-between items-center px-[16px] py-[10px] border-b-[1px] shadow-md border-main-shadow">
                    <h1 class="text-[20px] text-main font-[600]">Banner Ekle</h1>
                    <button class="absolute top-[-11px] right-[-13px] text-second" @click="closeBannerModal"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%] shadow-lg shadow-second-shadow"/></button>
                </div>
                <form class="flex flex-col gap-[10px] p-[10px]" enctype="multipart/form-data" method="POST">
                    <div class="containImageSelector relative">
                        <input type="file" id="fileInputBanner" ref="fileInputBanner" @change="handleFileChange" class="formInputs requiredInputs hidden" accept=".jpg, .jpeg, .png, .webp" required>
                        <div class="w-full h-[240px] border-[1px] rounded-[6px] flex justify-center items-center cursor-pointer" @click="triggerFileInput" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
                            <div v-if="!selectedImage" class="flex flex-col gap-[10px] justify-center items-center text-center text-second">
                                <span class="text-[18px]">Resim seçin veya sürükleyip bırakın</span>
                                <font-awesome-icon icon="fa-solid fa-upload" size="xl" />
                            </div>
                            <div v-else class="w-full h-full rounded-[6px] overflow-hidden">
                                <img :src="selectedImage" alt="Selected Image" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                    <input type="text" id="bannerHeader" placeholder="Başlık giriniz..." class="formInputs requiredInputs border-[1px] rounded-[6px] px-[12px] py-[4px]" required>
                    <textarea name="description" id="bannerDescription" placeholder="Açıklama giriniz..." class="formInputs border-[1px] rounded-[6px] px-[12px] py-[4px]"></textarea>
                    <div class="flex justify-center items-center"><button type="button" @click="saveNewBanner" class="bg-second w-[120px] p-[4px] text-[17px] text-white rounded-[10px]">Kaydet</button></div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #bannerModal {
        display: none;
    }
    #bannerModal.open {
        display: flex;
    }
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