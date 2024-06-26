<script setup>
  import { ref, onMounted, watch } from 'vue';
  import AjaxScripts from '../scripts/ajaxScripts.js';
  import { getImageFromUploads, getDetailsPage } from '../scripts/common.js';
  import { useRouter } from 'vue-router';

  const router = useRouter();

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
          originalBooks.value = res;
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

  function applyFilters() {
    let filteredBooks = originalBooks.value;
    if (searchBook.value !== '') {
      filteredBooks = filteredBooks.filter(x => x.name.toLowerCase().includes(searchBook.value.toLowerCase()));
    }
    if (selectedWriter.value !== 0) {
      filteredBooks = filteredBooks.filter(x => x.writer == selectedWriter.value);
    }
    if (selectedCategory.value !== 0) {
      filteredBooks = filteredBooks.filter(x => x.category == selectedCategory.value);
    }
    if (selectedPublisher.value !== 0) {
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

  function openFilter() {
    document.querySelector('.bookFilters').classList.add('open');
  }
  function closeFilter() {
    document.querySelector('.bookFilters').classList.remove('open');
  }

  onMounted(() => {
    const catIdFromQuery = router.currentRoute.value.query.category;
    if (catIdFromQuery) {
      selectedCategory.value = parseInt(catIdFromQuery);
      // Bu satırı kullanmak yerine, selectedCategory'nin değişmesini izleyen
      // bir watch kullanarak DOM manipülasyonu yapmayı tercih edebilirsiniz.
      // document.getElementById('categorySelect').value = catIdFromQuery;
        watch(selectedCategory, (newValue) => {
            const currentRoute = router.currentRoute.value;
            const query = { ...currentRoute.query };

            if (newValue !== 0) {
            query.category = newValue.toString();
            } else {
            delete query.category; // Remove category from query params
            }

            // Update URL without reloading
            router.push({ query });
        });
    }

    fetchDatas().then(() => {
      applyFilters();
      watch([searchBook, selectedWriter, selectedCategory, selectedPublisher, canRent], () => {
        applyFilters();
      });
    });

    console.log('Books loaded:', books.value);
  });
</script>

<template>
    <div class="w-full px-[20px] flex">
        <div class="bookFilters fixed flex flex-col gap-[12px] items-center justify-start w-[235px] pt-[24px] pb-[34px] border-[1px] border-black dark:border-white shadow-md dark:shadow-lg dark:shadow-[rgba(225,225,225,0.55)] rounded-[10px] px-[18px] md:hidden md:absolute md:w-full md:h-full md:p-[40px] md:rounded-none md:text-black md:justify-center md:z-20 md:top-0 md:left-0 md:bg-white">
            <button class="absolute top-[4px] right-[4px] text-red-600 hidden md:block" @click="closeFilter()"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%]"/></button>
            <button @click="clearFilter()" class="w-full px-[12px] py-[6px] border-[1px] border-second-shadow bg-second text-white text-[18px] font-semibold shadow-md shadow-second-shadow rounded-[8px] mb-[12px]">Temizle</button>
            <div class="w-full flex flex-col px-[12px] pt-[8px] pb-[12px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[8px]">
                <label for="searchBook" class="text-[18px] font-semibold">Kitap</label>
                <input v-model="searchBook" id="searchBook" type="text" placeholder="Kitap adı" class="w-full border-[1px] px-[4px] py-[2px] border-[#ddd] rounded-[4px] text-center dark:text-black">
            </div>
            <div class="w-full flex flex-col px-[12px] pt-[8px] pb-[12px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[8px]">
                <label for="writerSelect" class="text-[18px] font-semibold">Yazar</label>
                <select v-model="selectedWriter" name="writerSelect" id="writerSelect" class="w-full border-[1px] border-[#ddd] dark:text-black rounded-[4px] px-[4px] py-[2px]">
                    <option class="p-[4px] border-b-[1px] border-black" value=0 disabled>Seçim yapınız</option>
                    <option class="p-[4px] border-b-[1px] border-black" v-for="writer in writers" :key="writer.writerId" :value="writer.writerId">{{ writer.name }}</option>
                </select>
            </div>
            <div class="w-full flex flex-col px-[12px] pt-[8px] pb-[12px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[8px]">
                <label for="categorySelect" class="text-[18px] font-semibold">Kategori</label>
                <select v-model="selectedCategory" name="categorySelect" id="categorySelect" class="w-full border-[1px] border-[#ddd] dark:text-black rounded-[4px] px-[4px] py-[2px]">
                    <option value=0 disabled>Seçim yapınız</option>
                    <option v-for="category in categories" :key="category.catId" :value="category.catId">{{ category.name }}</option>
                </select>
            </div>
            <div class="w-full flex flex-col px-[12px] pt-[8px] pb-[12px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[8px]">
                <label for="publisherSelect" class="text-[18px] font-semibold">Yayınevi</label>
                <select v-model="selectedPublisher" name="publisherSelect" id="publisherSelect" class="w-full border-[1px] border-[#ddd] dark:text-black rounded-[4px] px-[4px] py-[2px]">
                    <option value=0 disabled>Seçim yapınız</option>
                    <option v-for="publisher in publishers" :key="publisher.publisherId" :value="publisher.publisherId">{{ publisher.name }}</option>
                </select>
            </div>
            <div class="w-full flex px-[12px] py-[10px] items-center justify-center border-[1px] border-[#ddd] rounded-[6px] gap-[16px]">
                <input v-model="canRent" type="checkbox" id="canRent" class="scale-[1.85]">
                <label for="canRent" class="text-[18px] font-semibold">Kiralanabilir</label>
            </div>
        </div>
        <div class="w-full pl-[250px] pr-[10px] md:pl-[10px] md:justify-center flex items-center gap-[20px] flex-wrap">
            <button class="hidden w-full md:block px-[12px] py-[6px] border-[1px] border-second-shadow bg-second text-white text-[18px] font-semibold shadow-md shadow-second-shadow rounded-[8px]" @click="openFilter()">Filtrele</button>
            <div v-for="book in books" :key="book._id" >
                <div v-if="book.isBorrowed" class="relative dark:bg-[rgba(155,155,155,0.55)] w-[220px] h-[270px] p-[16px] border-[2px] border-[rgba(155,155,155,0.75)] rounded-[12px] shadow-md shadow-[rgba(155,155,155,0.55)] flex flex-col justify-center items-center gap-[8px]">
                    <div class="absolute top-[4px] w-full px-[12px] flex justify-between items-center text-[14px] font-semibold">
                        <span v-if="(categories.find(x => x.catId == book.category) != null)">{{ categories.find(x => x.catId == book.category).name }}</span>
                        <span v-else>Diğer</span>
                    </div>
                    <img :src="getImageFromUploads(`books/${book.images[0]}`)" :alt=book.name class="h-[150px] max-w-full rounded-[5px] grayscale">
                    <span :title=book.name class="text-[18px] font-semibold text-center truncate max-w-full">{{ book.name }}</span>
                    <span class="absolute bottom-[4px] text-[16px] font-semibold text-red-800">Mevcut Değil</span>
                </div>
                <div v-else class="relative dark:bg-main-shadow cursor-pointer w-[220px] h-[270px] p-[16px] border-[2px] border-main rounded-[12px] shadow-md shadow-main-shadow flex flex-col justify-center items-center gap-[8px]" @click="getDetailsPage(router, book._id)">
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

<style scoped>
  .bookFilters.open {
    display: flex;
  }
</style>