const mongoose = require('mongoose');

// function that creates a new schema
const Schema = mongoose.Schema;

// create a new schema: schema just defines the structure of the document that we save to a collection/database
const counterSchema = new Schema({
  title: {
    type: String, 
    required: true
  },
  count: {
    type: Number, 
    required: true
  }
// keeps track of when the document was created and when it was last updated
}, {timestamps: true});

// create a new model using the schema: a model is what we use methods on to interact with the database
module.exports = mongoose.model('SearchCounts', counterSchema);
