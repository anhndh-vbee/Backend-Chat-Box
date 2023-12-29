const axios = require("axios");
const urlSearch = "https://jsonplaceholder.typicode.com/comments/1";
// const url = "https://hustllm.vbeecore.com/chat";

const search = async () => {
  try {
    const result = await axios.get(urlSearch);
    return result.data.body;
  } catch (error) {
    return `Someting wrong when search: ${error.message}`;
  }
};

module.exports = search;
