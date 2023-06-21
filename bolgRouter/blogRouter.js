const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getABlog,
  postABlog,
  updateABlog,
  deleteABlog,
} = require("../controller/blogController");

router.get("/", getAllBlogs);
router.post("/", postABlog);
router.get("/:id", getABlog);
router.patch("/:id", updateABlog);
router.delete("/:id", deleteABlog);

module.exports = router;
