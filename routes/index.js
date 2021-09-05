const express = require('express');
const router = express.Router();
const { ensureGuest, ensureAuth } = require('../middleware/auth');

router.get('/', ensureGuest, (req, res) => {
    res.render('login');
});

router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

module.exports = router;