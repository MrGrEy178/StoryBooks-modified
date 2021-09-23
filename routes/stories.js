const router = require('express').Router();
const { ensureAuth } = require('../middleware/auth');
const Stories = require('../schemas/Stories');


// rendering add page
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add', {
        separator: '../'
    });
});


// post request to add a story
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.author = req.user.id;
        await Stories.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
    }
});

// get request to the story
router.get('/:id', ensureAuth, async (req, res) => {
    const story = await Stories.findById(req.params.id).lean();
    res.render('stories/index', story);
});

module.exports = router;