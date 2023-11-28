const axios = require("axios");
const urlSearch = "https://jsonplaceholder.typicode.com/comments/1";

const search = async () => {
  try {
    const result = await axios.get(urlSearch);
    // console.log(result.data.body);
    return result.data.body;
  } catch (error) {
    return `Someting wrong when search: ${error.message}`;
  }
};

module.exports = search;
