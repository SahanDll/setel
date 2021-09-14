const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const IP = "127.0.0.1";
const routes = require("./routes");
app.use(express.json());

app.use(cors());
app.options("*", cors());
app.use("/", routes);

app.listen(PORT, IP, () => {
  console.log("API Gateway has started on port " + PORT);
});
