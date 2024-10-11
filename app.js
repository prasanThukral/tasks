const express = require("express");
require("dotenv").config();
const bodyparser = require("body-parser");
const taskRouter = require("./routes")
const app = express();
app.use(bodyparser.json());
app.use(taskRouter)
const port = process.env.PORT ||3000;
app.listen(port, () => console.log(`app is listed on the port => ${port} `));
