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
    if (req.user.id != story.author._id && story.privacy != 'Public') {
            res.render('error/404', {
            separator: '../../'
        });
    } else {
        res.render('stories/show', {
            story,
            separator: '../../'
        });
    }
});

// show all public stories
router.get('/', ensureAuth, async (req, res) => {
    let stories = await Stories.find({"privacy": "Public"}).populate("author").lean();
    res.render('stories/index', {
        stories,
    })
});

// show all public stories from user or all stories by authorized user
router.get('/users/:id', ensureAuth, async (req, res) => {
    let stories = await Stories.find({"author": req.params.id}).lean();
    if (req.params.id == req.user.id) {
        res.redirect('../../dashboard');
    } else {
        res.render('stories/index', {
            stories,
            separator: '../../'
        });   
    }
});

// get request to edit story page
router.get('/:id/edit', ensureAuth, async (req, res) => {
    let story = await Stories.findById(req.params.id).lean();
    if (req.user.id == story.author._id) {
        res.render('stories/edit', {
            story
        });
    } else {
        res.render('error/404');
    }
});

// put request to edit a story
router.put('/:id', ensureAuth, async (req,res) => {
    let story = await Stories.findById(req.params.id).populate('author').lean();
    if(!story){
        res.render('error/404');
    }else{
        if (req.user.id == story.author._id) {
            story = await Stories.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            res.redirect('../../dashboard');
        } else {
            res.render('error/500');
        }
    }
});

// delete a story
router.delete('/:id', ensureAuth, async (req,res) => {
    let story = await Stories.findById(req.params.id).populate('author').lean();
    try {
        if(!story){
            res.render('error/404');
        }else{
            if (req.user.id == story.author._id) {
                await Stories.deleteOne({_id: req.params.id});
                res.redirect('/dashboard');
            } else {
                res.render('error/404');
            }
        }
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
});

module.exports = router;