const express = require("express");
const routes = express.Router();
const main = require("../func/scrape");

routes.post("/indeed", async (req, res) => {
  try {
    let skill = "web developer";
    let scrp = await main(skill);
    return res.status(200).json({
      status: "ok",
      list: scrp.list,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = routes;
