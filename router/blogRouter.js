const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getABlog,
  postABlog,
  updateABlog,
  deleteABlog,
  getByCategory,
} = require("../controller/blogController");

router.get("/", getAllBlogs);
router.post("/", postABlog);
router.get("/:id", getABlog);
router.put("/:id", updateABlog);
router.delete("/:id", deleteABlog);
router.get("/filter/search", getByCategory);

module.exports = router;
