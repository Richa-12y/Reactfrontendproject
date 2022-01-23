import AES from "crypto-js/aes";
import ENC_UTF8 from "crypto-js/enc-utf8";
import { ENCKEY  } from "../helpers/constant";

const UtilService = {
    Encrypt,
    Decrypt,
    GenerateGUID
}

function Encrypt(data) {
    let jsondata = JSON.stringify(data);
    return AES.encrypt(jsondata, ENCKEY);
}
function Decrypt(encData) {
    var bytes = AES.decrypt(encData.toString(), ENCKEY);
    var data = bytes.toString(ENC_UTF8);
    return JSON.parse(data);
}
function GenerateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export default UtilService;