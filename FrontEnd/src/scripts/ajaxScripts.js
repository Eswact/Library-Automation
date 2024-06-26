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
  CreateBook: function ({ data, onSuccess, onError }) {
    postData("books/create", data, onSuccess, onError);
  },
  UpdateBook: function ({ params, data, onSuccess, onError }) {
    postData(`books/update/${params.id}`, data, onSuccess, onError);
  },
  DeleteBook: function ({ data, onSuccess, onError }) {
    postData(`books/delete/${data}`, null, onSuccess, onError);
  },
  GetUserList: function ({ onSuccess, onError }) {
    fetchData("users/published", onSuccess, onError);
  },
  CreateUser: function ({ data, onSuccess, onError }) {
    postData(`users/registerAdmin`, data, onSuccess, onError);
  },
  DeleteUser: function ({ data, onSuccess, onError }) {
    postData(`users/delete/${data}`, null, onSuccess, onError);
  },
  RentBookRequest: function ({ data, onSuccess, onError }) {
    postData("books/createRequest", data, onSuccess, onError);
  },
  GetRequests: function ({ onSuccess, onError }) {
    fetchData("books/requests", onSuccess, onError);
  },
  AcceptRequest: function ({ data, onSuccess, onError }) {
    postData(`books/acceptRequest`, data, onSuccess, onError);
  },
  RejectRequest: function ({ data, onSuccess, onError }) {
    postData(`books/rejectRequest/${data}`, null, onSuccess, onError);
  },
  GetBorrowed: function ({ onSuccess, onError }) {
    fetchData("books/borrowedBooks", onSuccess, onError);
  },
  EndBorrow: function ({ data, onSuccess, onError }) {
    postData(`books/endBorrow/${data}`, null, onSuccess, onError);
  },
};

export default AjaxScripts;
