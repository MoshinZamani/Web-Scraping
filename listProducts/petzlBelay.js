// Lists Petzl products and a short description

const cheerio = require("cheerio");
const axios = require("axios");

async function performScraping() {
  // downloading the target web page
  // by performing an HTTP GET request in Axios
  const axiosResponse = await axios.request({
    method: "GET",
    url: "https://petzl.com/GB/en/Sport/Belay-Devices-And-Descenders",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });

  //   // parsing the HTML source of the target web page with Cheerio
  const $ = cheerio.load(axiosResponse.data);
  const names = [];
  const descriptions = [];
  const links = [];
  const belay = [];
  const productTitles = $(".productTitle");
  productTitles.each((index, element) => {
    names.push(productTitles[index].children[0].data);
  });
  const productDescriptions = $(".productDescription");
  productDescriptions.each((index, element) => {
    descriptions.push(productDescriptions[index].children[0].data);
  });

  const productLinks = $(".verticalProduct");
  productLinks.find("a").each((index, element) => {
    // links.push(element);
    console.log($(element).attr("href"));

    links.push($(element).attr("href"));
  });

  for (let i = 0; i < productDescriptions.length; i++) {
    belay.push({
      name: names[i],
      link: links[i],
      description: descriptions[i],
    });
  }
  console.log(belay);
}

performScraping();
