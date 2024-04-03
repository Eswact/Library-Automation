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

function getBannerImage(filePath) {
    return `http://localhost:3000/uploads/banners/${filePath}`;
}

export { setlocalstorage, getlocalstorage, getBannerImage };