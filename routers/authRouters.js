// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const database = require("../db");

// Trang đăng nhập
router.get('/login', (req, res) => {
  res.render('login');
});

// Xử lý đăng nhập
router.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  try {
    const [rows] = await database.query(query, [email]);
    if (rows.length > 0) {
      const user = rows[0];
      if (user.password === password) {
        res.cookie('user_id', user.id, { httpOnly: true });
        return res.redirect('/inbox');
      }
      else {
        res.render('login', { error: 'Sai email hoặc mật khẩu' });
      }
    } else {
      res.render('login', { error: 'Sai email hoặc mật khẩu' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).render('login', { error: 'Lỗi server' });
  }
});

// Trang đăng ký
router.get('/register', (req, res) => {
  res.render('register');
});

// Xử lý đăng ký
router.post('/register', (req, res) => {
  const { full_name, email, password } = req.body;
  const query = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
  database.query(query, [full_name, email, password], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;
