<script setup>
    import { ref, onMounted } from 'vue';
    import AjaxScripts from '@/scripts/ajaxScripts';
    import { toast } from 'vue3-toastify';

    const requests = ref([]);
    const borrowedBooks = ref([]);
    const users = ref([]);
    const books = ref([]);


    function getRequests() {
        let onSuccess = (data) => {
            requests.value = data;
        }
        let onError = (err) => {
            console.log(err);
        }
        AjaxScripts.GetRequests({ onSuccess, onError });
    }
    function getBorrowedBooks() {
        let onSuccess = (data) => {
            borrowedBooks.value = data.filter(x => x.state == true && x.rentEnd == null);
        }
        let onError = (err) => {
            console.log(err);
        }
        AjaxScripts.GetBorrowed({ onSuccess, onError });
    }
    function getUsers() {
        let onSuccess = (res) => {
            users.value = res;
            console.log(users);
        };
        let onError = (err) => {
            console.log(err);
        };
        AjaxScripts.GetUserList({ onSuccess, onError });
    }
    function getBooks() {
        let onSuccess = (res) => {
            books.value = res;
            console.log(books);
        };
        let onError = (err) => {
            console.log(err);
        };
        AjaxScripts.GetBooks({ onSuccess, onError });
    }
    function acceptRequest(id) {
        document.getElementById('endDate').value = '';
        document.getElementById('endDateModal').classList.add('open');
        document.getElementById('acceptReqBut').onclick = null;
        document.getElementById('acceptReqBut').onclick = function() {
            if (document.getElementById('endDate').value != '' && new Date(document.getElementById('endDate').value) < new Date()) {
                toast("Geçmiş bir tarih seçemezsiniz.", { autoClose: 3000, type: "error", position: "bottom-right" });
                return;
            }
            else {
                let data = {
                    id: id,
                    plannedEnd: (document.getElementById('endDate').value != '') ? document.getElementById('endDate').value : null
                };
                let onSuccess = (res) => {
                    toast("İstek kabul edildi.", { autoClose: 3000, type: "success", position: "bottom-right" });
                    getRequests();
                    getBorrowedBooks();
                    document.getElementById('endDateModal').classList.remove('open');
                };
                let onError = (err) => {
                    toast("İstek kabul edilirken hata", { autoClose: 3000, type: "error", position: "bottom-right" });
                    console.log(err);
                };
                AjaxScripts.AcceptRequest({ data, onSuccess, onError });
            }
        };
    }
    function rejectRequest(id) {
        let data = id;
        let onSuccess = (res) => {
            toast("İstek reddedildi.", { autoClose: 3000, type: "success", position: "bottom-right" });
            getRequests();
        };
        let onError = (err) => {
            toast("İstek reddedilirken hata", { autoClose: 3000, type: "error", position: "bottom-right" });
            console.log(err);
        };
        AjaxScripts.RejectRequest({ data, onSuccess, onError });
    }
    function rentEnd(id) {
        let data = id;
        let onSuccess = (res) => {
            toast("Kitap iade edildi.", { autoClose: 3000, type: "success", position: "bottom-right" });
            getBorrowedBooks();
        };
        let onError = (err) => {
            toast("Kitap iade edilirken hata", { autoClose: 3000, type: "error", position: "bottom-right" });
            console.log(err);
        };
        AjaxScripts.EndBorrow({ data, onSuccess, onError });
    }
    function closeEndDateModal() {
        document.getElementById('endDateModal').classList.remove('open');
    }

    //Ready
    onMounted(() => {
        getBorrowedBooks();
        getRequests();
        getUsers();
        getBooks();

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
    <div class="w-full dark:text-black">
        <div class="adminTabs w-full flex items-center justify-around p-[16px] text-[18px] md:px-0 sm:flex-col sm:gap-[14px]">
            <span class="sm:w-[200px] text-center" data-number="1">Kiralanmış Kitaplar</span>
            <span class="sm:w-[200px] text-center"  data-number="2">Kiralama İstekleri</span>
        </div>
        <div data-number="1" class="settingsContent w-full flex-col gap-[20px]">
            <div class="w-full flex flex-col items-center justify-center gap-[10px] px-[20px]">
                <h1 class="text-[20px] text-main dark:text-white w-full">Kiralanmış Kitaplar</h1>
                <hr class="w-full mb-[12px]">
                <div v-if="borrowedBooks != ''"  class="flex flex-col items-center gap-[10px] px-[10%] md:px-[20px] py-[10px] w-full">
                    <div v-for="borrowedBook in borrowedBooks" :key="borrowedBooks._id" 
                    :class="{'border-red-600': borrowedBook.plannedEnd && new Date(borrowedBook.plannedEnd) < new Date(), 'w-full flex items-center justify-between relative text-[18px] text-center px-[18px] py-[6px] bg-main-shadow border-[2px] rounded-[8px] border-main': true}">
                        <div class="dark:text-white text-[16px] flex flex-col gap-[4px] justify-start items-start">
                            <span class="text-[17px] font-bold text-main dark:text-second flex gap-[10px]"><span class="w-[120px] text-start">Başlangıç Tarihi:</span> <span class="semibold text-[16px] text-black dark:text-white">{{ borrowedBook.rentStart }}</span></span>
                            <span v-if="borrowedBook.plannedEnd"  class="text-[17px] font-bold text-main dark:text-second flex gap-[10px]"><span class="w-[120px] text-start">Planlanmış Bitiş:</span> <span class="semibold text-[16px] text-black dark:text-white">{{ borrowedBook.plannedEnd }}</span></span>
                            <span class="text-[17px] font-bold text-main dark:text-second flex gap-[10px]"><span class="w-[120px] text-start">Kullanıcı:</span> <span class="semibold text-[16px] text-black dark:text-white">{{ users.find(x => x._id == borrowedBook.userId).username }}</span></span> 
                            <span class="text-[17px] font-bold text-main dark:text-second flex gap-[10px] justify-start items-start"><span class="w-[120px] text-start">Kitap:</span> <span class="semibold text-[16px] text-black dark:text-white">{{ books.find(x => x._id == borrowedBook.bookId).name }}</span></span>
                        </div>
                        <div class="flex gap-[10px]">
                            <button class="px-[12px] py-[6px] text-[20px] font-semibold text-white bg-green border-green-shadow shadow-sm shadow-green-shadow rounded-[8px]" @click="rentEnd(borrowedBook._id)">Bitir</button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center gap-[10px] px-[10%] md:px-[20px] py-[10px] w-full dark:text-white text-[20px]" v-else>
                    Kiralanmış Kitap bulunmuyor.
                </div>
            </div>
        </div>
        <div data-number="2" class="settingsContent w-full flex-col gap-[20px]">
            <div class="w-full flex flex-col items-center justify-center gap-[10px] px-[20px]">
                <h1 class="text-[20px] w-full text-main dark:text-white">Kiralama İstekleri</h1>
                <hr class="mb-[10px] w-full">
                <div v-if="requests != ''"  class="flex flex-col items-center gap-[10px] px-[10%] md:px-[20px] py-[10px] w-full">
                    <div v-for="request in requests" :key="request._id" class="w-full flex items-center justify-between relative text-[18px] text-center px-[18px] py-[6px] bg-main-shadow border-[2px] rounded-[8px] border-main">
                        <div class="dark:text-white text-[16px]">
                            <span><span class="text-[20px] font-bold text-second">{{ users.find(x => x._id == request.userId).username }}</span> kullanıcısı <span class="text-[20px] font-bold text-second">{{ books.find(x => x._id == request.bookId).name }}</span> kitabını kiralamak istiyor.</span>
                        </div>
                        <div class="flex gap-[10px]">
                            <button class="px-[6px] text-white bg-green border-green-shadow shadow-sm shadow-green-shadow rounded-[8px]" @click="acceptRequest(request._id)"><font-awesome-icon icon="fa-solid fa-check" /></button>
                            <button class="px-[6px] text-white bg-red-600 border-red-400 shadow-sm shadow-red-400 rounded-[8px]" @click="rejectRequest(request._id)"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center gap-[10px] px-[10%] md:px-[20px] py-[10px] w-full dark:text-white text-[20px]" v-else>
                    Kiralama isteği bulunmuyor.
                </div>
            </div>
        </div>

        <!-- end date modal -->
        <div id="endDateModal" class="z-20 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] justify-center items-center dark:text-black">
            <div class="bg-white w-[400px] rounded-[10px] relative border-[1px] border-main-shadow shadow-lg shadow-main-shadow max-w-[95%]">
                <div class="flex flex-col gap-[10px] p-[10px]" method="POST">
                    <div class="justify-between items-center px-[8px] py-[5px] border-b-[1px]">
                        <h1 class="text-[18px] text-main font-[600]">Kabul İşlemi</h1>
                        <button class="absolute top-[-11px] right-[-13px] text-second" @click="closeEndDateModal"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%] shadow-lg shadow-second-shadow"/></button>
                    </div>
                    <span class="text-[15px] text-black">Kitabın iade tarihi belirli ise aşağıdan seçim yapınız. İade tarihi belirli değil ise boş bırakılabilir.</span>
                    <input type="date" id="endDate"  class="border-[1px] rounded-[6px] px-[12px] py-[4px]">
                    <div class="flex justify-center items-center">
                        <button id="acceptReqBut" class="bg-second w-[120px] p-[4px] text-[17px] text-white rounded-[10px]">Kabul et</button>
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
    #endDateModal {
        display: none;
    }
    #endDateModal.open {
        display: flex;
    }
</style>