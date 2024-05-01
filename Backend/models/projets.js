const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  id: Number,
  name: String,
  creator: String,
  creationDate: String,
  description: String,
  contributors: [String],
  lastUpdate: String,
  languages: [String],
  githubUrl: String,
  image: String,
  etoiles: Number
});

const Project = mongoose.model('Projets', projectSchema);


module.exports = Project;
