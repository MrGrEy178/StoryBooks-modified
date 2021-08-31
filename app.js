const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');

const app = express();

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') })

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT);