const express = require("express");
const app = express();
const getRoute = require("./routes/getRoutes");

const PORT = 8451;

app.use("/api/v1", getRoute);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log("server is running at http://localhost:" + PORT);
});
