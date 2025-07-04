const puppeteer = require("puppeteer");

async function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function fetchNotices() {
    console.log("reached fetch notice section");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  try {
    await page.goto("https://www.education.gov.in/press-releases", {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });

    await delay(5000);
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

    console.log("✅ Notices fetched:", notices.length);
    return notices;
  } catch (error) {
    console.error("❌ Error fetching notices:", error);
    return [];
  } finally {
    await browser.close();
  }
}

module.exports = fetchNotices;
