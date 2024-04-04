import { fetchData, postData, fetchDataPromise, postFormData } from '../services/ajaxService.js';

const AjaxScripts = {
  GetBanners: function ({ onSuccess, onError }) {
    fetchData("home/banners/published", onSuccess, onError);
  },
  GetCategories: function ({ onSuccess, onError }) {
    fetchData("categories/published", onSuccess, onError);
  }
};

export default AjaxScripts;
