/*const cron = require("node-cron");
const fetchNotices = require("../scraper/noticeScraper");
const Notice = require("../models/Notice");

cron.schedule("0 *6 * * *", async () => {
  console.log("🕒 Running notice scraper...");

  const newNotices = await fetchNotices();

  for (const notice of newNotices) {
    const exists = await Notice.findOne({ url: notice.url });
    if (!exists) {
      await Notice.create({ ...notice, timestamp: new Date() });
    }
  }

  const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
  await Notice.deleteMany({ timestamp: { $lt: fifteenDaysAgo } });

  console.log("✅ Scraper finished.");
});
const cron = require("node-cron");
const fetchNotices = require("../scraper/noticeScraper");
const Notice = require("../models/Notice");

console.log("🧠 Scheduler initialized...");

// Runs every 6 hours: at 0th minute of 0,6,12,18 o'clock
cron.schedule("0 *6 * * *", async () => {
  try {
    console.log("🕒 Running notice scraper job...");

    const newNotices = await fetchNotices();

    for (const notice of newNotices) {
      const exists = await Notice.findOne({ url: notice.url });
      if (!exists) {
        await Notice.create({ ...notice, timestamp: new Date() });
        console.log(`📌 New notice saved: ${notice.title}`);
      } else {
        console.log(`⚠️ Skipping duplicate: ${notice.title}`);
      }
    }

    // Delete notices older than 15 days
    const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
    const deleted = await Notice.deleteMany({ timestamp: { $lt: fifteenDaysAgo } });
    
    if (deleted.deletedCount > 0) {
      console.log(`🗑️ Deleted ${deleted.deletedCount} old notices.`);
    }

    console.log("✅ Notice scraper job completed.");
  } catch (error) {
    console.error("❌ Error in scheduler:", error.message);
  }
});

const fetchNotices = require("../scraper/noticeScraper");
const Notice = require("../models/Notice");

console.log("🧠 Scheduler (dev mode) initialized...");

// Run every 5 seconds (for testing)
setInterval(async () => {
  try {
    console.log("🕒 Running notice scraper job...");

    const newNotices = await fetchNotices();

    for (const notice of newNotices) {
      const exists = await Notice.findOne({ url: notice.url });
      if (!exists) {
        await Notice.create({ ...notice, timestamp: new Date() });
        console.log(`📌 New notice saved: ${notice.title}`);
      } else {
        console.log(`⚠️ Skipping duplicate: ${notice.title}`);
      }
    }

    // Delete notices older than 15 days
    const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
    const deleted = await Notice.deleteMany({ timestamp: { $lt: fifteenDaysAgo } });

    if (deleted.deletedCount > 0) {
      console.log(`🗑️ Deleted ${deleted.deletedCount} old notices.`);
    }

    console.log("✅ Notice scraper job completed.");
  } catch (error) {
    console.error("❌ Error in scheduler:", error.message);
  }
}, 5000);*/ // ← Runs every 5000ms (5 seconds)
/*const cron = require("node-cron");
const fetchNotices = require("../scraper/noticeScraper");
const Notice = require("../models/Notice");

console.log("🧠 Scheduler initialized...");

// Runs every 6 hours: at 0th minute of 0, 6, 12, 18 o'clock
cron.schedule("0 *6 * * *", async () => {
  try {
    console.log("🕒 Running notice scraper job...");

    const newNotices = await fetchNotices();

    for (const notice of newNotices) {
      const exists = await Notice.findOne({ url: notice.url });
      if (!exists) {
        await Notice.create({ ...notice, timestamp: new Date() });
        console.log(`📌 New notice saved: ${notice.title}`);
      } else {
        console.log(`⚠️ Skipping duplicate: ${notice.title}`);
      }
    }

    // Delete notices older than 15 days
    const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
    const deleted = await Notice.deleteMany({ timestamp: { $lt: fifteenDaysAgo } });

    if (deleted.deletedCount > 0) {
      console.log(`🗑️ Deleted ${deleted.deletedCount} old notices.`);
    }

    console.log("✅ Notice scraper job completed.");
  } catch (error) {
    console.error("❌ Error in scheduler:", error.message);
  }
});
*/

const cron = require("node-cron");
const fetchNotices = require("../scraper/noticeScraper");
const Notice = require("../models/Notice");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

console.log("🧠 Scheduler initialized...");

cron.schedule("0 */6 * * *", async () => {
  try {
    console.log("🕒 Running notice scraper job...");

    const newNotices = await fetchNotices();

    for (const notice of newNotices) {
      const exists = await Notice.findOne({ url: notice.url });

      if (!exists) {
        const savedNotice = await Notice.create({ ...notice, timestamp: new Date() });
        console.log(`📌 New notice saved: ${notice.title}`);

        // ✅ Send email to all users
        const users = await User.find({}, "email");
        for (const user of users) {
          await sendEmail(
            user.email,
            "📢 New Government Notice Available",
            `<p>Dear User,</p>
             <p>A new government notice has been published:</p>
             <p><strong>${notice.title}</strong></p>
             <p><a href="${notice.url}" target="_blank">Click here to view the notice</a></p>
             <p>Regards,<br/>CitizenAid Team</p>`
          );
        }
      } else {
        console.log(`⚠️ Skipping duplicate: ${notice.title}`);
      }
    }

    // 🧹 Delete old notices
    const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
    const deleted = await Notice.deleteMany({ timestamp: { $lt: fifteenDaysAgo } });

    if (deleted.deletedCount > 0) {
      console.log(`🗑️ Deleted ${deleted.deletedCount} old notices.`);
    }

    console.log("✅ Notice scraper job completed.");

  } catch (error) {
    console.error("❌ Error in scheduler:", error.message);
  }
});
