require("dotenv").config();
const express = require("express");
const blogRouter = require("./bolgRouter/blogRouter");

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());

// server listening
app.listen(PORT, () => {
  console.log("Server Running on port ", PORT);
});

// routes
app.use("/api/blogs", blogRouter);
