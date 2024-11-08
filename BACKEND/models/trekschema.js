const mongoose = require("mongoose");

const TrekSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  bestFor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
  bestvisit:{
    type:String,
    required:true,
  },
  googleMapLink: {
    type: String,
    required: true,
  },
});

const TrekCollection = mongoose.model("Treks", TrekSchema); 
module.exports = TrekCollection;
