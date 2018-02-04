var express = require('express');
var router = express.Router();
var path = require('path');

var pages = [];

/* GET landing pages listing. */
router.post('/landing-pages/create', function(req, res, next) {
   var slug = req.body.slug;
   var markup = req.body.markup;
   pages.push({markup: markup, slug: slug});
   console.log(pages);
   res.render('new.html');
});

router.get('/landing-pages/new', function(req, res, next) {
    res.render('form.html');
});

router.get('/landing-pages/get', function(req, res, next) {
    var slug = req.params.slug;
    res.render(slug);
});

router.get('/landing-pages/search/:slug', function(req, res, next) {
    console.log('Searching...');
    var found = false;
    var slug = req.params.slug;
    pages.forEach(function(page) {
        if (page.slug === slug) {
            found = true;
        }
    });
    if (found) {
        res.render('search-results.html', {results: 'Hello'});
    } else {
        res.send('Nothing Found!');
    }
});

router.get('/landing-pages/update', function(req, res, next) {
    res.send('respond with a resource');
});

/* POST landing pages listening. */
router.post('/landing-pages', function(req, res, next) {
    res.send(req.body.name);
});

/* PUT landing pages listening. */
router.put('/landing-pages', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
