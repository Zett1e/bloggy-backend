const pool = require("../database");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "7d" });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // validation
    if (!name || !email || !password) {
      throw Error("Please fill all required fields");
    }

    if (!validator.isEmail(email)) {
      throw Error(" Invalid Email ");
    }

    // check email already used or not
    const checkUserQuery = `SELECT email FROM users WHERE email=?`;
    const exits = await pool.query(checkUserQuery, email);

    if (exits.length) {
      throw Error("Email is already in use");
    } else {
      try {
        // register with hashed password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const sqlQuery = `INSERT INTO users (name,email,password) VALUES (?,?,?) `;
        const user = await pool.query(sqlQuery, [name, email, hashPassword]);

        // create token
        const token = createToken(user.id);

        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    res.status(200).json({ status: exits });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // validator
    if (!email || !password) {
      throw Error("Please fill all required fields");
    }

    // check user authentication
    const checkUserQuery = "SELECT * FROM users WHERE email=?";
    const user = await pool.query(checkUserQuery, email);

    if (!user.length) {
      throw Error(" Incorrect Email ");
    } else {
      const match = await bcrypt.compare(password, user[0].password);
      if (!match) {
        throw Error(" Incorrect Passsword ");
      }
      const token = createToken(user[0].id);

      res.status(201).json({user:user[0],token});
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
