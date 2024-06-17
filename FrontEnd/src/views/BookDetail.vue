<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import AjaxScripts from "../scripts/ajaxScripts.js";
import { useRouter } from "vue-router";
import { getImageFromUploads, getDetailsPage, getlocalstorage } from "../scripts/common.js";
import VueJwtDecode from 'vue-jwt-decode';
import { toast } from 'vue3-toastify';

const router = useRouter();
const bookDetail = ref(null);
const books = ref([]);
const categoryId = ref(null);
const category = ref(null);
const writer = ref(null);
const publisher = ref(null);

const rentBook = async () => { 
  if (getlocalstorage('user') != '') {
    const token = getlocalstorage('user');
    const decodedToken = VueJwtDecode.decode(token);
    let data = {
      bookId: bookDetail.value._id,
      userId: decodedToken.id,
    };
    console.log(data);
    let onSuccess = (res) => {
      toast("Kitap kiralama isteği gönderildi.", { autoClose: 3000, type: "success", position: "bottom-right" });
    };
    let onError = (err) => {
      console.log(err);
      toast( err.response.data.message || "Kitap kiralama isteği gönderilirken bir hata oluştu.", { autoClose: 3000, type: "error", position: "bottom-right" });
    };
    AjaxScripts.RentBookRequest({ data, onSuccess, onError });
  }
  else {
    toast("Öncelikle giriş yapmanız gerekli.", { autoClose: 3000, type: "error", position: "bottom-right" });
    openForm();
  }
};
const openForm = () => {
  document.getElementById('sign-form').classList.add('open');
  document.querySelectorAll('#sign-form input').forEach(input => {
    input.value = '';
  });
  document.querySelector('.sign-button:first-child').click();
};

function getWriter() {
  let onSuccess = (res) => {
    writer.value = res.find((w) => w.writerId == bookDetail.value.writer);
  };
  let onError = (err) => {
      console.log(err);
  };
  AjaxScripts.GetWriters({onSuccess, onError});
}
function getPublisher() {
  let onSuccess = (res) => {
    publisher.value = res.find((p) => p.publisherId == bookDetail.value.publisher);
  };
  let onError = (err) => {
      console.log(err);
  };
  AjaxScripts.GetPublishers({onSuccess, onError});
}
function getCategory() {
  let onSuccess = (res) => {
      category.value = res.find((cat) => cat.catId == bookDetail.value.category);
  };
  let onError = (err) => {
      console.log(err);
  };
  AjaxScripts.GetCategories({onSuccess, onError});
}

function getBookDetail(bookId) {
  let data = bookId;
  let onSuccess = (res) => {
    console.log(res);
    bookDetail.value = res;
    categoryId.value = res.category;
    getSimilarBooks();
    getCategory();
    getWriter();
    getPublisher();
  };
  let onError = (err) => {
    console.log(err);
  };
  AjaxScripts.FindBook({ data, onSuccess, onError });
}

function getSimilarBooks() {
  let onSuccess = (res) => {
    let similarBooks = res.filter(
      (book) =>
        book.category == categoryId.value &&
        book._id != router.currentRoute.value.params.bookId
    );
    console.log(similarBooks)
    books.value = similarBooks.slice(-4).reverse();
  };
  let onError = (err) => {
    console.log(err);
  };
  AjaxScripts.GetBooks({ onSuccess, onError });
}

onMounted(() => {
  if (router.currentRoute.value.params.bookId) {
    getBookDetail(router.currentRoute.value.params.bookId);
  }
  watch(
    () => router.currentRoute.value.params.bookId,
    () => {
      getBookDetail(router.currentRoute.value.params.bookId);
    }
  );
});
</script>

<template>
  <div
    v-if="bookDetail"
    class="w-full p-[20px] flex flex-col justify-center items-center gap-[40px]"
  >
    <!-- book detail -->
    <div
      class="book-details w-[80%] flex justify-beetwen gap-[20px] xl:w-full md:flex-col"
    >
      <!-- images -->
      <div class="flex flex-col gap-[10px] w-[30%] xl:w-[50%] box-border px-[2%]">
        <img
          class="w-full border-[1px] border-second rounded-[8px] shadow-md shadow-second-shadow"
          :src="getImageFromUploads(`books/${bookDetail.images[0]}`)"
        />
      </div>
      <!-- details -->
      <div
        class="w-[60%] pl-[10px] flex flex-col justify-around gap-[24px] lg:w-full lg:gap-[20px] xl:w-[50%] md:w-[100%]"
      >
        <!-- title -->
        <div class="flex flex-col items-start py-[5px]">
          <h1 class="text-[40px] text-main dark:text-white">
            {{ bookDetail.name }}
          </h1>
          <span class="text-second text-[18px]">{{ writer.name }}</span>
        </div>
        <!-- description -->
        <p>{{ bookDetail.subject }}</p>
        <!-- other details -->
        <div class="flex items-center gap-[10%]">
          <div class="flex flex-col gap-[15px] items-start">
            <div class="flex items-center gap-[10px] text-main dark:text-white">
              <span class="font-semibold">Kategori</span>
            </div>
            <div class="flex items-center gap-[10px] text-main dark:text-white">
              <span class="font-semibold">Yayınevi</span>
            </div>
            <div class="flex items-center gap-[10px] text-main dark:text-white">
              <span>Yaş</span>
            </div>
          </div>
          <div class="flex flex-col gap-[15px] items-start">
            <div class="flex items-center gap-[10px] text-second">
              <span class="font-semibold">{{ category.name }}</span>
            </div>
            <div class="flex items-center gap-[10px] text-second">
              <span class="font-semibold">{{ publisher.name }}</span>
            </div>
            <div class="flex items-center gap-[10px] text-second">
              <span class="font-semibold">
                <span v-if="bookDetail.ageRange == 1">Her Yaş</span>
                <span v-else-if="bookDetail.ageRange == 2">Çocuk</span>
                <span v-else-if="bookDetail.ageRange == 3">Yetişkin</span>
                <span v-else>-</span>
              </span>
            </div>
          </div>
        </div>
        <!-- rent -->
        <div class="flex items-center gap-[16px]">
          <button
            @click="rentBook(bookDetail._id)"
            class="w-[244px] p-[12px] rounded-[10px] border-[1px] border-[#00823cbf] text-[18px] text-[#00823cbf] dark:bg-[#00823cbf] dark:text-white shadow-md shadow-[#00823c57] font-medium hover:bg-[#00823cbf] hover:text-white dark:hover:bg-[white] dark:hover:text-[#00823cbf] transition-all"
          >
            Kiralamak istiyorum
          </button>
        </div>
      </div>
    </div>
    <!-- like other books -->
    <div class="w-full flex flex-col gap-[20px] p-[20px]">
        <hr>
        <h3
          class="absolute text-[20px] mt-[-17px] ml-[25px] bg-[white] dark:bg-dark"
        >
          Benzer Kitaplar
        </h3>
        <div
          class="w-full flex gap-[10px] flex-wrap justify-start xl:justify-center items-center px-[20px] xl:px-0"
        >
          <div
            v-for="book in books"
            :key="book.id"
            class="book-bookd rounded-[12px] border-[1px] w-[calc(25%-16px)] border-main 2xl:min-w-[340px] 2xl:w-[32%] xl:w-[340px] p-[20px] flex flex-col gap-[8px] shadow-md shadow-main-shadow relative"
          >
            <img
              class="h-[124px] object-contain"
              :src="getImageFromUploads(`books/${book.images[0]}`)"
              :alt="book.name"
            />
            <div
              class="flex justify-between items-center px-[10px] pt-[8px] border-t-[1px] border-t-main"
            >
              <span class="text-[20px] text-main dark:text-white">{{
                book.name
              }}</span>
              <button
                @click="getDetailsPage(router, book._id)"
                class="gelatine text-[17px] border-1 border-second bg-second text-white p-[6px] rounded-[10px] shadow shadow-second-shadow"
              >
                Detaylar
                <font-awesome-icon
                  icon="fa-solid fa-circle-chevron-right"
                  size="lg"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
  <div v-else>
    <p>Yükleniyor...</p>
  </div>
</template>
