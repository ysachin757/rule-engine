// src/models/ruleModel.js
const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    name: String,
    expression: String
});

const Rule = mongoose.model('Rule', ruleSchema);

module.exports = Rule;
