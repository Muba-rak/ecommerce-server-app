require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoute");
const userRouter = require('./routes/userRoute')
const cookieparser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
mongoose.set("strictQuery", true);

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieparser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  // log(req.signedCookies)
  res.send("E-commerce API");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
