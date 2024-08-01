const express = require('express');
const router = express.Router();
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground')
const { campgroundSchema } = require('../Schemas');
const campgrounds = require('../controllers/campgrounds')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const campground = require('../models/campground');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,  upload.array('campground[images]'),validateCampground, catchAsync(campgrounds.createCampground))


// new page
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    // show page
    .get(catchAsync(campgrounds.showCampground))
    // updating a gymlocation
    .put(isLoggedIn, isAuthor, upload.array('campground[images]'), validateCampground, catchAsync(campgrounds.updateCampground))
    // delete a gymlocation
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

// get a gymlocation to update it
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;