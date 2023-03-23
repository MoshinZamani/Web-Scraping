// Lists name of all BlackDiamond belay devices and harnesses

const cheerio = require("cheerio");
const axios = require("axios");

async function performScraping() {
  // downloading the target web page
  // by performing an HTTP GET request in Axios
  const axiosResponse = await axios.request({
    method: "GET",
    url: "https://www.blackdiamondequipment.com/en_GB/shop/belay/",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });

  //   // parsing the HTML source of the target web page with Cheerio
  const $ = cheerio.load(axiosResponse.data);
  const names = [];
  const links = [];
  const belay = [];

  const productTitles = $(".product-title");
  productTitles.each((index, element) => {
    names.push(productTitles[index].children[0].data);
  });

  const productLinks = $(".product-thumb-link");
  productLinks.each((index, element) => {
    // links.push(element);
    if ($(element).attr("href"))
      links.push(
        "https://www.blackdiamondequipment.com/" + $(element).attr("href")
      );
  });

  for (let i = 0; i < names.length; i++) {
    belay.push({ name: names[i], link: links[i] });
  }
  console.log(belay);
}

performScraping();
