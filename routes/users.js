var express = require('express');
var router = express.Router();
var path = require('path');

var pages = [];

// GET landing pages listing.
router.get('/landing-pages', function(req, res, next) {
    var slugs = [];
    pages.forEach(function(page) {
        slugs.push(page.slug);
    });
    res.render('summary.html', {slugs: slugs});
});

// POST Add a new landing page resource.
router.post('/landing-pages/create', function(req, res, next) {
   var slug = req.body.slug;
   var markup = req.body.markup;
   pages.push({markup: markup, slug: slug});
   console.log(pages);
   res.render('new.html');
});

// GET Render a form to create a new landing page resource
router.get('/landing-pages/new', function(req, res, next) {
    res.render('form.html');
});

// GET Render a form to look for an existing page
router.get('/landing-pages/search', function(req, res, next) {
    var slug = req.params.slug;
    res.render('search-form.html');
});

// GET Renders a form to look for a saved page based on Slug
router.get('/landing-pages/get', function(req, res, next) {
    var found = false;
    var slug = req.query.slug;
    var content;
    console.log('Searching for...' + slug);
    pages.forEach(function(page) {
        if (page.slug === slug) {
            found = true;
            content = page.markup;
        }
    });
    if (found) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(content);
        res.end();
    } else {
        res.render('403.html');
    }
});

// GET Renders page to edit data from a saved page
router.get('/landing-pages/edit', function(req, res, next) {
    var found = false;
    var slug = req.query.slug;
    var content, slug;
    console.log('In /edit, Searching for...' + slug);
    pages.forEach(function(page) {
        if (page.slug === slug) {
            found = true;
            content = page.markup;
            slug = page.slug;
        }
    });
    if (found) {
        res.render('edit-results.html', {results: content, slug: slug});
    } else {
        res.render('403.html');
    }
});

// GET Renders a saved page, based on Slug
router.get('/landing-pages/:slug', function(req, res, next) {
    var found = false;
    var slug = req.params.slug;
    var content;
    console.log('Direct Searching for...' + slug);
    pages.forEach(function(page) {
        if (page.slug === slug) {
            found = true;
            content = page.markup;
        }
    });
    if (found) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(content);
        res.end();
    } else {
        res.render('403.html');
    }
});

// GET Renders a form to update the markup of a saved page
router.get('/landing-pages/update/update', function(req, res, next) {
    res.render('edit-form.html');
});

// POST Updates the markup of a saved pages
router.post('/landing-pages/update', function(req, res, next) {
    var slug = req.body.slug;
    var markup = req.body.markup;

    // Look for the matching Slung, then update the entry.
    pages.forEach(function(page) {
        if (page.slug === slug) {
            page.markup = markup;
            //pages.push({markup: markup, slug: slug});
        }
    });
    console.log(pages);
    res.render('updated.html');
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
