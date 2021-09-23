const router = require('express').Router();
const { ensureAuth } = require('../middleware/auth');
const Stories = require('../schemas/Stories');

router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add', {
        separator: '../'
    });
});

router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.author = req.user.id;
        await Stories.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;