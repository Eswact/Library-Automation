import { fetchData, postData, fetchDataPromise, postFormData } from '../services/ajaxService.js';

const AjaxScripts = {
  GetBooks: function ({ onSuccess, onError }) {
    fetchData("books/published", onSuccess, onError);
  },
  GetBanners: function ({ onSuccess, onError }) {
    fetchData("home/banners/published", onSuccess, onError);
  },
  GetCategories: function ({ onSuccess, onError }) {
    fetchData("categories/published", onSuccess, onError);
  },
  FindCategory: function ({ data, onSuccess, onError }) {
    postData(`categories/find/${data}`, null, onSuccess, onError);
  },
  GetWriters: function ({ onSuccess, onError }) {
    fetchData("writers/published", onSuccess, onError);
  },
  GetPublishers: function ({ onSuccess, onError }) {
    fetchData("publishers/published", onSuccess, onError);
  },
};

export default AjaxScripts;
