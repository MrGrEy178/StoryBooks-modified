const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

mongoose.createConnection("mongodb://localhost:27017/StoryBooks", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.set("views", path.join(__dirname, "views"));
app.engine('.hbs', exphbs({
    defaultLayout: 'index',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Router
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT);