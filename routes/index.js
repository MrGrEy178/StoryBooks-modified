const express = require('express');
const router = express.Router();
const { ensureGuest, ensureAuth } = require('../middleware/auth');
const Stories = require('../schemas/Stories');

router.get('/', ensureGuest, (req, res) => {
    res.render('login');
});

router.get('/dashboard', ensureAuth, async (req, res) => {
    res.render('dashboard', {
        username: req.user.displayName,
        posts: await Stories.find({"author": req.user.id}).lean()
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

module.exports = router;