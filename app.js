const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
const MongoStore = require('connect-mongo')(session);

// Load config
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Google oauth initialization
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
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));
app.get('/public/js/main.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/main.js');
});

// Router
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'))


const PORT = process.env.PORT || 5000;

app.listen(PORT);