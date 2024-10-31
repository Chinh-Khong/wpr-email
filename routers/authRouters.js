// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Trang đăng nhập
router.get('/signin', (req, res) => {
    res.render('signin');
});

// Xử lý đăng nhập
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.cookie('user_id', result[0].id);
            res.redirect('/inbox');
        } else {
            res.send('Sai email hoặc mật khẩu');
        }
    });
});

// Trang đăng ký
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Xử lý đăng ký
router.post('/signup', (req, res) => {
    const { full_name, email, password } = req.body;
    const query = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
    db.query(query, [full_name, email, password], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

module.exports = router;
