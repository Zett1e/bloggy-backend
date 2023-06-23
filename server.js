require("dotenv").config();
const express = require("express");
const blogRouter = require("./router/blogRouter");
const userRouter = require('./router/userRouter')

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
app.use("/api/users", userRouter);
