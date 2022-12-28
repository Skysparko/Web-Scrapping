const puppeteer = require("puppeteer");
const fs = require("fs");
const data = {
  list: [],
};

async function main(skill) {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(
    `https://in.indeed.com/jobs?q=${skill}&l=Jodhpur%2C+Rajasthan`,
    {
      timeout: 0,
      waitUntil: "networkidle0",
    }
  );

  const jobDetails = await page.evaluate((data) => {
    const items = document.querySelectorAll("td.resultContent");
    items.forEach((item, index) => {
      const title = item.querySelector("h2.jobTitle>a")?.innerText;
      const link = item.querySelector("h2.jobTitle>a")?.href;
      let salary = item.querySelector(
        "div.metadata.salary-snippet-container>div"
      )?.innerText;
      const company = item.querySelector("span.companyName")?.innerText;

      if (salary === null) {
        salary = "not defined";
      }

      data.list.push({
        title,
        link,
        salary,
        company,
      });
    });
    return data;
  }, data);

  let response = jobDetails;
  const json = JSON.stringify(jobDetails, null, 2);
  fs.writeFile("job.json", json, "utf-8", () => {
    console.log("data written in job.json");
  });
  browser.close();

  return response;
}

module.exports = main;
