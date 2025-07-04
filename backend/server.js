const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("./config/Cloudinary");
const bodyParser = require("body-parser");
const stringSimilarity = require("string-similarity");
const predictRoute = require('./routes/predict');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', predictRoute);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
  //require("./controllers/noticeScraper");
  //require("./middleware/scheduler.js"); // Adjust path if needed

  require("./middleware/scheduler");
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/schemes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/schemes", require("./routes/schemeRoutes"));
app.use("/api/grievances", require("./routes/grievanceRoutes"));
app.use("/api", require("./routes/ration"));
app.use("/api",require("./routes/cscRoutes"));
app.use("/api",require("./routes/grievanceRoutes"));
app.use("/api",require("./routes/commodityRoutes"));
app.use("/api/schemes",require("./routes/rationschemes"));
app.use("/api",require("./routes/rationInfo"));
app.use("/api/notices", require("./routes/noticeRoute"));
app.use("/api", require("./routes/ngoRoutes"));


app.listen(8000, () => console.log("Server running on port 8000"));
