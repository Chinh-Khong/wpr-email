
// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const authRoutes = require('./routers/authRouters');
const emailRoutes = require('./routers/emailRouters');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sử dụng router
app.use('/', authRoutes);
app.use('/', emailRoutes);
app.get('/', (req, res) => {
    res.render('signin');
});
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});