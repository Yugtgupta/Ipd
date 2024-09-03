const { default: puppeteer } = require("puppeteer");
const fs = require("fs");
// export and import 
async function getRupeevest() {
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
    headless: true,
  });
  const page = await browser.newPage();

  page.on("console", (msg) => {
    console.log("LOG:", msg.text());
  });

  await page.goto("https://www.rupeevest.com");
  const scriptToRun = async () => {
    const asset_selection = ["1", "2", "3", "50", "4", "5"];
    const rating_selection = ["1", "2", "3", "4", "5", "Unrated"];
    const amc_selection = ["all"];
    const fund_m_selection = ["all"];
    const index_selection = ["all"];
    const fund_id = ["1"];
    const from_date = 0;
    const to_date = 0;

    const data = {
      selected_schemes: asset_selection,
      selected_rating: rating_selection,
      selected_amc: amc_selection,
      selected_manager: fund_m_selection,
      selected_index: index_selection,
      selected_fund_type: fund_id,
      selected_from_date: from_date,
      selected_to_date: to_date,
      condn_type: "asset",
    };

    const targetUrl = "/functionalities/asset_class_section?";

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Robots-Tag": "noindex",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
    //   throw new Error(HTTP error! status: ${response.status});
    console.log("not ok")
    }
    const result = await response.json();

    return result;
  };

  const data1 = await page.evaluate(scriptToRun);
  //   fs.writeFileSync("data.json", data1);
  //save data1 to file with og json format

  fs.writeFileSync("data.json", JSON.stringify(data1, null, 2)); // save data1 to file with og json format

  console.log(data1);
  await browser.close();
}
getRupeevest(); 