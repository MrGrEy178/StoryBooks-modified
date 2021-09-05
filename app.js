const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Google oath initialization
require('./config/passport')(passport);

connectDB();

const app = express();

// Handlebars
app.set("views", path.join(__dirname, "views"));
app.engine('.hbs', exphbs({
    defaultLayout: 'index',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Router
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));


const PORT = process.env.PORT || 5000;

app.listen(PORT);