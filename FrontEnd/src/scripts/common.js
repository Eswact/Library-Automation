import AjaxScripts from "./ajaxScripts";

function setlocalstorage(tmpname, tmpvalue) {
    window.localStorage.setItem(tmpname, encodeURIComponent(tmpvalue));
}

function getlocalstorage(tmpname) {
    var tmp_dbvalue = "";
    tmp_dbvalue = decodeURIComponent(window.localStorage.getItem(tmpname));
    if (tmp_dbvalue == "null") {
        tmp_dbvalue = "";
    }
    return tmp_dbvalue;
}

function validateEmail (email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

let uploadsUrl = "http://localhost:3000/uploads/";
function getImageFromUploads(filePath) {
    return `${uploadsUrl}${filePath}`;
}

function getCategoryFromId(id) {
    const data = id;
    const onSuccess = function (response) {
        console.log(response.name);
        return response;
    };
    const onError = function (error) {
        console.log(error);
        return null;
    };
    AjaxScripts.FindCategory({ data, onSuccess, onError});
}

export { setlocalstorage, getlocalstorage, getImageFromUploads, validateEmail, getCategoryFromId };