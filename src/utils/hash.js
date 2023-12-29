const CryptoJS = require("crypto-js");

const hashData = (data) => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};

module.exports = hashData;
