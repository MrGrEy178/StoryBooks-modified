const router = require('express').Router();

router.get('/create-story', (req, res) => {
    res.render('create');
});