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

let uploadsUrl = "http://localhost:3000/uploads/";
function getImageFromUploads(filePath) {
    return `http://localhost:3000/uploads/${filePath}`;
}

export { setlocalstorage, getlocalstorage, getImageFromUploads };