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

// get request to the single story
router.get('/:id', ensureAuth, async (req, res) => {
    let story = await Stories.findById(req.params.id).populate('author').lean();
    res.render('stories/show', {
        story,
    });
});

// show all public stories from user or all stories by auth user
router.get('/users/:id', ensureAuth, async (req, res) => {
    let stories = await Stories.find({"author": req.params.id}).lean();
    res.render('stories/index', {
        stories,
    })
});

module.exports = router;