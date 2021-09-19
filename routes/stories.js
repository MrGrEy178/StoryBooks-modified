const router = require('express').Router();

router.get('/add-story', (req, res) => {
    res.render('stories/add');
});

module.exports = router;