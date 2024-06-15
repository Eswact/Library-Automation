import { fetchData, postData, fetchDataPromise, postFormData } from '../services/ajaxService.js';

const AjaxScripts = {
  GetBooks: function ({ onSuccess, onError }) {
    fetchData("books/published", onSuccess, onError);
  },
  FindBook: function ({ data, onSuccess, onError }) {
    postData(`books/find/${data}`, null, onSuccess, onError);
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
  GetCompanyInfos: function ({ onSuccess, onError }) {
    fetchData("company/published", onSuccess, onError);
  },
  SendMail: function ({ data, onSuccess, onError }) {
    postData(`company/sendMail`, data, onSuccess, onError);
  },
  SaveImg2Upload: function ({ data, onSuccess, onError }) {
    postFormData("admin/addImage2Upload", data, onSuccess, onError);
  },
  AddBanner: function ({ data, onSuccess, onError }) {
    postData("home/banners/create", data, onSuccess, onError);
  },
  DeleteBanner: function ({ data, onSuccess, onError }) {
    console.log(data);
    postData(`home/banners/delete/${data}`, null, onSuccess, onError);
  },
  UpdateCompanyInfos: function ({ data, onSuccess, onError }) {
    postData("company/updateInfos", data, onSuccess, onError);
  },
  CreateWriter: function ({ data, onSuccess, onError }) {
    postData("writers/create", data, onSuccess, onError);
  },
  UpdateWriter: function ({ data, onSuccess, onError }) {
    postData("writers/update", data, onSuccess, onError);
  },
  DeleteWriter: function ({ data, onSuccess, onError }) {
    postData(`writers/delete/${data}`, null, onSuccess, onError);
  },
  CreatePublisher: function ({ data, onSuccess, onError }) {
    postData("publishers/create", data, onSuccess, onError);
  },
  UpdatePublisher: function ({ data, onSuccess, onError }) {
    postData("publishers/update", data, onSuccess, onError);
  },
  DeletePublisher: function ({ data, onSuccess, onError }) {
    postData(`publishers/delete/${data}`, null, onSuccess, onError);
  },
  CreateCategory: function ({ data, onSuccess, onError }) {
    postData("categories/create", data, onSuccess, onError);
  },
  UpdateCategory: function ({ data, onSuccess, onError }) {
    postData("categories/update", data, onSuccess, onError);
  },
  DeleteCategory: function ({ data, onSuccess, onError }) {
    postData(`categories/delete/${data}`, null, onSuccess, onError);
  },
};

export default AjaxScripts;
