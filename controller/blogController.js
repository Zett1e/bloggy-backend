const pool = require("../database");

const getAllBlogs = async (req, res) => {
  try {
    const sqlQuery = `SELECT blogs.id, title, body, category, imageUrl, created_at, user_id, users.name, users.email 
      FROM blogs INNER JOIN users ON blogs.user_id = users.id`;
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postABlog = async (req, res) => {
  const { title, body, category, imageUrl, user_id } = req.body;
  try {
    const sqlQuery =
      "INSERT INTO blogs (title,body,category,imageUrl,user_id) VALUES (?,?,?,?,?)";
    const rows = await pool.query(sqlQuery, [
      title,
      body,
      category,
      imageUrl,
      user_id,
    ]);
    res.status(201).json(rows);
  } catch (error) {
    if (error.message.includes("Data too long for column 'body'")) {
      res.status(400).json({ error: "Data too long for body" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const getABlog = async (req, res) => {
  const { id } = req.params;
  try {
    const sqlQuery = "SELECT * FROM blogs WHERE id=?";
    const rows = await pool.query(sqlQuery, id);
    if (!rows.length) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateABlog = async (req, res) => {
  const { id } = req.params;
  const { title, body, category, imageUrl } = req.body;
  try {
    const sqlQuery =
      "UPDATE blogs SET title=?, body=?, category=? , imageUrl=? WHERE id=?";
    const rows = await pool.query(sqlQuery, [
      title,
      body,
      category,
      imageUrl,
      id,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteABlog = async (req, res) => {
  const { id } = req.params;
  try {
    const sqlQuery = "DELETE FROM blogs WHERE id=?";
    await pool.query(sqlQuery, id);
    res.status(200).json({ status: "success", message: "Blog Deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const sqlQuery = `SELECT blogs.id, title, body, category, imageUrl, created_at, user_id, users.name, users.email 
      FROM blogs INNER JOIN users ON blogs.user_id = users.id WHERE category=?`;
    const rows = await pool.query(sqlQuery, category);
    if (!rows.length) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getABlog,
  getAllBlogs,
  postABlog,
  updateABlog,
  deleteABlog,
  getByCategory,
};
