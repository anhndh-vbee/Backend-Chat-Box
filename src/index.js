const express = require("express");
const cors = require("cors");
const configs = require("./configs");
const router = require("./routes");
const connectDB = require("./configs/connectDB");

const app = express();
const port = configs.PORT || 8089;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

connectDB();

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
