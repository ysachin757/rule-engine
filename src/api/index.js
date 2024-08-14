// src/api/index.js
const express = require('express');
const router = express.Router();
const Rule = require('../models/ruleModel');
const { createRule, combineRules, evaluateRule } = require('../utils/ruleEngine');

// Create a new rule
router.post('/create-rule', async (req, res) => {
    try {
        const { name, expression } = req.body;
        const rule = new Rule({ name, expression });
        await rule.save();
        res.json({ message: 'Rule created successfully', rule });
    } catch (error) {
        res.status(400).json({ error: 'Error creating rule' });
    }
});

// Get all rules
router.get('/rules', async (req, res) => {
    try {
        const rules = await Rule.find();
        res.json(rules);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching rules' });
    }
});

// Evaluate a rule
router.post('/evaluate-rule', (req, res) => {
    try {
        const { ruleString, data } = req.body;
        const ast = createRule(ruleString);
        const result = evaluateRule(ast, data);
        res.json({ eligible: result });
    } catch (error) {
        res.status(400).json({ error: 'Error evaluating rule' });
    }
});

// Combine rules
router.post('/combine-rules', (req, res) => {
    try {
        const { rules } = req.body;
        const combinedAST = combineRules(rules);
        res.json({ ast: combinedAST });
    } catch (error) {
        res.status(400).json({ error: 'Error combining rules' });
    }
});

module.exports = router;
