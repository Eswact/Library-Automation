<script setup>
    import { ref, onMounted } from 'vue';
    import AjaxScripts from '../scripts/ajaxScripts.js';
    import { getImageFromUploads } from '../scripts/common.js';
    import { toast } from 'vue3-toastify';

    //Variables
    const books = ref([]);
    const writers = ref([]);
    const categories = ref([]);
    const publishers = ref([]);

    //Fetch Datas
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

    // Modals
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
    };
    const resetFormInputs = () => {
        document.querySelectorAll('.formInputs').forEach(function (e) {
            e.value = null;
        });
        document.querySelectorAll('.formSelects').forEach(function (e) {
            e.value = 0;
        });
    };

    //Writer Modal
    const openWriterModal = (editId) => {
        resetFormInputs();
        if (editId) {
            //Edit
            document.getElementById('writerModal').dataset.editId = editId;
            let thisWriter = writers.value.find(x => x.writerId == editId);
            document.getElementById('writerName').value = thisWriter.name;
        }
        else {
            //Add
            document.getElementById('writerModal').dataset.editId = '';
        }
        document.getElementById('writerModal').classList.add('open');
    };
    const closeWriterModal = () => {
        document.getElementById('writerModal').classList.remove('open');
    };
    const saveWriter = () => {
        let control = controlInputs();
        if (control) {
            if (document.getElementById('writerModal').dataset.editId != '') {
                //Edit
                let data = {
                    id: parseInt(document.getElementById('writerModal').dataset.editId),
                    name: document.getElementById('writerName').value,
                };
                let onSuccess = (res) => {
                    fetchDatas();
                    toast("Yazar Düzenlendi.", { autoClose: 3000, type: "success", position: "bottom-right" });
                };
                let onError = (err) => {
                    toast("Yazar Düzenlenirken Hata", { autoClose: 3000, type: "error", position: "bottom-right" });
                };
                AjaxScripts.UpdateWriter({data, onSuccess, onError});
            }
            else {
                //Add
                let data = {
                    name: document.getElementById('writerName').value,
                };
                let onSuccess = (res) => {
                    fetchDatas();
                    toast("Yeni Yazar Eklendi", { autoClose: 3000, type: "success", position: "bottom-right" });
                };
                let onError = (err) => {
                    toast("Yeni Yazar Eklenirken Hata", { autoClose: 3000, type: "error", position: "bottom-right" });
                };
                AjaxScripts.CreateWriter({data, onSuccess, onError});
            }
            closeWriterModal();
        }
        else {
            toast("Lütfen tüm alanları doldurunuz.", { autoClose: 3000, type: "error", position: "bottom-right" });
        }
    };
    const deleteWriter = (id) => {
        let data = id
        let onSuccess = (res) => {
            fetchDatas();
            toast("Yazar Silindi.", { autoClose: 3000, type: "success", position: "bottom-right" });
        };
        let onError = (err) => {
            toast("Yazar Silinirken Hata", { autoClose: 3000, type: "error", position: "bottom-right" });
        };
        AjaxScripts.DeleteWriter({data, onSuccess, onError});
    };

    //Publisher Modal
    const openPublisherModal = (editId) => {
        resetFormInputs();
        if (editId) {
            //Edit
            document.getElementById('publisherModal').dataset.editId = editId;
            let thisPublisher = publishers.value.find(x => x.publisherId == editId);
            document.getElementById('publisherName').value = thisPublisher.name;
        }
        else {
            //Add
            document.getElementById('publisherModal').dataset.editId = '';
        }
        document.getElementById('publisherModal').classList.add('open');
    };
    const closePublisherModal = () => {
        document.getElementById('publisherModal').classList.remove('open');
    };
    const savePublisher = () => {
        let control = controlInputs();
        if (control) {
            if (document.getElementById('publisherModal').dataset.editId != '') {
                //Edit
                let data = {
                    id: parseInt(document.getElementById('publisherModal').dataset.editId),
                    name: document.getElementById('publisherName').value,
                };
                let onSuccess = (res) => {
                    fetchDatas();
                    toast("Yayınevi Düzenlendi.", { autoClose: 3000, type: "success", position: "bottom-right" });
                };
                let onError = (err) => {
                    toast("Yayınevi Düzenlenirken Hata", { autoClose: 3000, type: "error", position: "bottom-right" });
                };
                AjaxScripts.UpdatePublisher({data, onSuccess, onError});
            }
            else {
                //Add
                let data = {
                    name: document.getElementById('publisherName').value,
                };
                let onSuccess = (res) => {
                    fetchDatas();
                    toast("Yeni Yayınevi Eklendi.", { autoClose: 3000, type: "success", position: "bottom-right" });
                };
                let onError = (err) => {
                    toast("Yayınevi Eklenirken Hata", { autoClose: 3000, type: "error", position: "bottom-right" });
                };
                AjaxScripts.CreatePublisher({data, onSuccess, onError});
            }
            closePublisherModal();
        }
        else {
            toast("Lütfen tüm alanları doldurunuz.", { autoClose: 3000, type: "error", position: "bottom-right" });
        }
    };
    const deletePublisher = (id) => {
        let data = id
        let onSuccess = (res) => {
            fetchDatas();
            toast("Yayınevi Silindi.", { autoClose: 3000, type: "success", position: "bottom-right" });
        };
        let onError = (err) => {
            toast("Yayınevi Silinirken Hata", { autoClose: 3000, type: "error", position: "bottom-right" });
        };
        AjaxScripts.DeletePublisher({data, onSuccess, onError});
    };

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
                        <button @click="openWriterModal(writer.writerId)" class="gelatine editItem py-[1px] px-[8px] text-white bg-second rounded-[10px]"><font-awesome-icon :icon="['fas', 'pen']"/></button>
                        <span>{{ writer.name }}</span>
                        <button @click="deleteWriter(writer.writerId)" class="gelatine deleteItem py-[1px] px-[8px] text-white bg-red-600 rounded-[10px]"><font-awesome-icon :icon="['fas', 'trash-can']"/></button>
                    </div>
                    <div @click="openWriterModal()" class="cursor-pointer w-full flex items-center justify-center relative text-[18px] text-center px-[18px] py-[6px] bg-main-shadow border-[2px] rounded-[8px] border-main">
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
                    <div v-for="category in categories" :key="category._id" class="flex justify-center items-center itemCard w-[360px] h-[120px] rounded-[10px] overflow-hidden cursor-pointer relative">
                        <img :src="getImageFromUploads(`categories/${category.img}`)" :alt="category.title" class="w-full h-full object-cover">
                        <span class="absolute text-white text-[26px] font-[700] w-full h-full flex justify-center items-center p-[10px] bg-[rgba(0,0,0,0.2)] shadow-md shadow-[rgba(0,0,0,0.2)]">{{ category.name }}</span>
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
                        <button @click="openPublisherModal(publisher.publisherId)" class="gelatine editItem py-[1px] px-[8px] text-white bg-second rounded-[10px]"><font-awesome-icon :icon="['fas', 'pen']"/></button>
                        <span>{{ publisher.name }}</span>
                        <button @click="deletePublisher(publisher.publisherId)" class="gelatine deleteItem py-[1px] px-[8px] text-white bg-red-600 rounded-[10px]"><font-awesome-icon :icon="['fas', 'trash-can']"/></button>
                    </div>
                    <div @click="openPublisherModal()" class="cursor-pointer w-full flex items-center justify-center relative text-[18px] text-center px-[18px] py-[6px] bg-main-shadow border-[2px] rounded-[8px] border-main">
                        <div class="border-main border-[2px] rounded-[50%] text-main bg-white w-[30px] h-[30px] shadow-sm shadow-main flex justify-center items-center">
                            <font-awesome-icon icon="fa-solid fa-plus" size="lg"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Writer Modal -->
        <div id="writerModal" class="z-20 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] justify-center items-center dark:text-black">
            <div class="bg-white w-[400px] rounded-[10px] relative border-[1px] border-main-shadow shadow-lg shadow-main-shadow max-w-[95%]">
                <div class="justify-between items-center px-[16px] py-[10px] border-b-[1px] shadow-md border-main-shadow">
                    <h1 class="text-[20px] text-main font-[600]">Yazar Ekle</h1>
                    <button class="absolute top-[-11px] right-[-13px] text-second" @click="closeWriterModal"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%] shadow-lg shadow-second-shadow"/></button>
                </div>
                <form class="flex flex-col gap-[10px] p-[10px]" method="POST">
                    <input type="text" id="writerName" placeholder="Yazar adı giriniz..." class="formInputs requiredInputs border-[1px] rounded-[6px] px-[12px] py-[4px]" required>
                    <div class="flex justify-center items-center">
                        <button type="button" @click="saveWriter" class="bg-second w-[120px] p-[4px] text-[17px] text-white rounded-[10px]">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Publisher Modal -->
        <div id="publisherModal" class="z-20 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] justify-center items-center dark:text-black">
            <div class="bg-white w-[400px] rounded-[10px] relative border-[1px] border-main-shadow shadow-lg shadow-main-shadow max-w-[95%]">
                <div class="justify-between items-center px-[16px] py-[10px] border-b-[1px] shadow-md border-main-shadow">
                    <h1 class="text-[20px] text-main font-[600]">Yayınevi Ekle</h1>
                    <button class="absolute top-[-11px] right-[-13px] text-second" @click="closePublisherModal"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%] shadow-lg shadow-second-shadow"/></button>
                </div>
                <form class="flex flex-col gap-[10px] p-[10px]" method="POST">
                    <input type="text" id="publisherName" placeholder="Yayınevi adı giriniz..." class="formInputs requiredInputs border-[1px] rounded-[6px] px-[12px] py-[4px]" required>
                    <div class="flex justify-center items-center">
                        <button type="button" @click="savePublisher" class="bg-second w-[120px] p-[4px] text-[17px] text-white rounded-[10px]">Kaydet</button>
                    </div>
                </form>
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
    #writerModal {
        display: none;
    }
    #writerModal.open {
        display: flex;
    }
    #publisherModal {
        display: none;
    }
    #publisherModal.open {
        display: flex;
    }
</style>