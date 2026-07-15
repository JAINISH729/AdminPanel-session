const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

require('./config/db');
require('./config/passport');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.use(
    session({
        secret: 'adminpanel',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

app.use('/', require('./routes/adminRoutes'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Server Started : http://localhost:${port}`);
});