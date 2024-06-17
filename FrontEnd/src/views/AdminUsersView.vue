<script setup>
import { ref, onMounted, computed } from 'vue';
import AjaxScripts from "../scripts/ajaxScripts.js";
import { toast } from 'vue3-toastify';

const userList = ref([]);
const searchQuery = ref('');

function getUserList() {
    let onSuccess = (res) => {
        userList.value = res;
        console.log(userList);
    };
    let onError = (err) => {
        console.log(err);
    };
    AjaxScripts.GetUserList({ onSuccess, onError });
}
function getRoleFromEnum(role) {
    switch (role) {
        case 0:
            return "Admin";
        case 1:
            return "Personel";
        default:
            return "Kullanıcı";
    }
}
const filteredUserList = computed(() => {
    if (!searchQuery.value) {
        return userList.value;
    }
    return userList.value.filter(user => 
        user.username.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

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

// User Modal
const openUserModal = () => {
    resetFormInputs();
    document.getElementById('userModal').classList.add('open');
};
const closeUserModal = () => {
    document.getElementById('userModal').classList.remove('open');
};
const saveUser = () => {
    if (!controlInputs()) {
        toast("Lütfen tüm alanları doldurun.", { autoClose: 3000, type: "error", position: "bottom-right" });
        return;
    }
    let data = { 
        username: document.getElementById('userName').value, 
        mail: document.getElementById('userMail').value, 
        role: document.getElementById('userRole').value, 
    };
    let onSuccess = (res) => {
        toast("Kullanıcı eklendi.", { autoClose: 3000, type: "success", position: "bottom-right" });
        getUserList();
        closeUserModal();
    };
    let onError = (err) => {
        toast(err.response.data.message || "Kullanıcı eklenirken bir hata oluştu.", { autoClose: 3000, type: "error", position: "bottom-right" });
    };
    AjaxScripts.CreateUser({ data, onSuccess, onError });
};
const deleteUser = (id) => {
    let data = id
    let onSuccess = (res) => {
        getUserList();
        toast("Kullanıcı Silindi.", { autoClose: 3000, type: "success", position: "bottom-right" });
    };
    let onError = (err) => {
        toast("Kullanıcı Silinirken Hata", { autoClose: 3000, type: "error", position: "bottom-right" });
    };
    AjaxScripts.DeleteUser({data, onSuccess, onError});
};

// Ready
onMounted(() => {
    getUserList();
});
</script>

<template>
    <div class="w-full flex flex-col gap-[20px]">
        <div class="w-full px-[10%]">
            <input v-model="searchQuery" type="text" placeholder="Kullanıcı Ara" class="w-full bg-transparent border-b-[1px] text-center text-[20px] dark:text-white dark:border-white dark:placeholder-white"/>
        </div>
        <div class="w-full px-[10%] flex flex-col gap-[8px]">
            <div @click="openUserModal()" class="cursor-pointer w-full flex items-center justify-center relative text-[18px] text-center px-[18px] py-[6px] bg-main-shadow border-[2px] rounded-[8px] border-main">
                <div class="border-main border-[2px] rounded-[50%] text-main bg-white w-[30px] h-[30px] shadow-sm shadow-main flex justify-center items-center">
                    <font-awesome-icon icon="fa-solid fa-plus" size="lg"/>
                </div>
            </div>
            <div v-for="user in filteredUserList" :key="user._id" class="w-full flex items-center justify-between relative text-[18px] text-center px-[18px] py-[6px] bg-main-shadow border-[2px] rounded-[8px] border-main">
                <span class="w-[35px] text-second">{{ getRoleFromEnum(user.role) }}</span>
                <span>{{ user.username }} </span>
                <div class="w-[35px]">
                    <button @click="deleteUser(user._id)" v-if="user.role !== 0" class="gelatine py-[1px] px-[8px] text-white bg-red-600 rounded-[10px]"><font-awesome-icon icon="fa-solid fa-trash-can" size="lg"/></button>
                    <span class="w-[35.69px]" v-else></span>
                </div>
            </div>
        </div>

        <!-- User Modal -->
        <div id="userModal" class="z-20 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] justify-center items-center dark:text-black">
            <div class="bg-white w-[400px] rounded-[10px] relative border-[1px] border-main-shadow shadow-lg shadow-main-shadow max-w-[95%]">
                <div class="justify-between items-center px-[16px] py-[10px] border-b-[1px] shadow-md border-main-shadow">
                    <h1 class="text-[20px] text-main font-[600]">Kullanıcı Ekle</h1>
                    <button class="absolute top-[-11px] right-[-13px] text-second" @click="closeUserModal"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%] shadow-lg shadow-second-shadow"/></button>
                </div>
                <form class="flex flex-col gap-[10px] p-[10px]" method="POST">
                    <input type="text" id="userName" placeholder="Kullanıcı Adı" class="formInputs requiredInputs border-[1px] rounded-[6px] px-[12px] py-[4px]" required>
                    <input type="email" id="userMail" placeholder="Email" class="formInputs requiredInputs border-[1px] rounded-[6px] px-[12px] py-[4px]" required>
                    <select name="userRole" id="userRole" class="formSelects requiredSelects w-full border-[1px] p-[2px] rounded-[6px]">
                        <option value="0" selected disabled>Rol Seçimi</option>
                        <option value="1">Personel</option>
                        <option value="2">Kullanıcı</option>
                    </select>
                    <div class="flex justify-center items-center">
                        <button type="button" @click="saveUser" class="bg-second w-[120px] p-[4px] text-[17px] text-white rounded-[10px]">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #userModal {
        display: none;
    }
    #userModal.open {
        display: flex;
    }
</style>
