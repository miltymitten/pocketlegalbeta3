const express = require('express')
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

module.exports = router