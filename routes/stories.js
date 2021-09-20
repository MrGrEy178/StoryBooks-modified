const router = require('express').Router();
const { ensureAuth } = require('../middleware/auth')

router.get('/add-story', ensureAuth, (req, res) => {
    res.render('stories/add', {
        separator: '../'
    });
});

module.exports = router;