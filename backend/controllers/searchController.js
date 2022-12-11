// this file contains all the database logic for our routes

// const { response } = require('express')
const mongoose = require('mongoose')
const SearchCount = require('../models/clickcountModel')

// GET all metrics: not currently using this method
const getallSearchCounts = async (req, res) => {
    try{
    const allSearchCounts = await SearchCount.find({}).sort({createdAt: -1})
    res.status(200).json(allSearchCounts)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// GET a single metric: not currently using this method
const getSearchCount = async (req, res) => {
    try {
        const { id } = req.params
     
    // checks if the id is valid using mongoose    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such search count exists'})
    }

        const searchCount = await SearchCount.findById(id)

        res.status(200).json(searchCount)
    } catch (error) {
        return res.status(400).json({error: 'No such search count exists'})
    }
}

// POST a metric: not currently using this method
const createSearchCount = async (req, res) => {
    // grab each property from the request body
    const {title, count} = req.body

    // add the new search count to the database
    try {
        const newSearchCount = await SearchCount.create({title, count})
        res.status(200).json(newSearchCount) // send back 200 status and the new search count
    } catch (error) {  
        res.status(400).json({error: error.message}) // send back 400 status and the error message
    }
}

// UPDATE a metric
const updateSearchCount = async (req, res) => { 
    try {
        const { searchterm } = req.params

        const updateSearchCount = await SearchCount.findOneAndUpdate({title: searchterm}, {
            $inc: {count: 1}
        }, {upsert: true})

        if (!updateSearchCount) {
            return res.status(404).json({error: 'No such search count exists'})
        }
        res.status(200).json(updateSearchCount)

    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}


module.exports = {
    createSearchCount,
    getallSearchCounts,
    getSearchCount,
    updateSearchCount
}