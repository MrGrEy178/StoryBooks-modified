const express = require('express');
const router = express.Router();
const { ensureGuest, ensureAuth } = require('../middleware/auth');

router.get('/', ensureGuest, (req, res) => {
    res.render('login');
});

router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard', {
        posts: [
            {
                title: 'first',
                content: 'lorem ipsum dolor sit amet',
                status: 'Public'
            },{
                title: 'second',
                content: 'lorem ipsum dolor sit amet',
                status: 'Public'
            },{
                title: 'third',
                content: 'lorem ipsum dolor sit amet',
                status: 'Public'
            },{
                title: 'forth',
                content: 'lorem ipsum dolor sit amet',
                status: 'Public'
            },{
                title: 'fifth',
                content: 'lorem ipsum dolor sit amet',
                status: 'Public'
            }
        ]
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

module.exports = router;