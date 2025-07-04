
/*const puppeteer = require('puppeteer');

async function fetchNotices() {
  try {
    console.log("🚀 Reached notice section");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://ssp.tn.gov.in/');

    // Optional: wait for the notice section
    await page.waitForSelector('div.card.bg-danger.text-white', { timeout: 5000 });

    const notices = await page.evaluate(() => {
      const div = document.querySelector('div.card.bg-danger.text-white');
      if (!div) return [];

      const listItems = div.querySelectorAll('div.card-body ul li');
      return Array.from(listItems).map(li => li.textContent.trim());
    });

    console.log("📌 Notices found:", notices);
    await browser.close();
    return notices;
  } catch (error) {
    console.error('❌ Error fetching notices:', error.message);
    return [];
  }
}

module.exports = fetchNotices;*/


/*const puppeteer = require("puppeteer");

async function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function fetchNotices() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Setting user-agent to mimic a real browser
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  try {
    await page.goto("https://www.education.gov.in/press-releases", {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });

    // Replace waitForTimeout with custom delay
    await delay(5000); // Wait for 5 seconds

    await page.waitForSelector("ul.noPic li", { timeout: 20000 });

    const notices = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll("ul.noPic li"));
      return items.map((item) => {
        const link = item.querySelector("a");
        return {
          title: link?.textContent.trim(),
          url: link?.href,
        };
      });
    });

    console.log("✅ Notices fetched:", notices);
    return notices;
  } catch (error) {
    console.error("❌ Error fetching notices:", error.message);
    return [];
  } finally {
    await browser.close();
  }
}

module.exports = fetchNotices;*/

const Notice = require("../models/Notice");

exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ timestamp: -1 });
    res.status(200).json(notices);
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

