// this file contains all of our routes: routes are the endpoints that determine some other action needs to be taken
// e.g. in our case, when a GET request is made to the root page '/' (which is actually '/api/metrics'), our app runs getallSearchCounts

const express = require('express')

// import methods from controller folder: controller folder is where we define methods that interact with the databae
const {
    createSearchCount,
    getallSearchCounts,
    getSearchCount,
    updateSearchCount
} = require('../controllers/searchController')

// creates an instance of the router: allows us to make get, post, put, delete requests in this file
const router = express.Router()

// GET all metrics: not currently used
router.get('/', getallSearchCounts)

// GET a single metric using the id parameter (:id means its dynamic): not currently used
router.get('/:id', getSearchCount)

// POST a metric: not currently used
router.post('/', createSearchCount)

// UPDATE a metric
router.patch('/:searchterm', updateSearchCount)

// exports all our routes
module.exports = router