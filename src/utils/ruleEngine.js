// src/utils/ruleEngine.js
const { ASTNode, createRule } = require('./ast');

const combineRules = (rules) => {
    if (rules.length === 0) return null;

    let combinedRoot = createRule(rules[0]);

    for (let i = 1; i < rules.length; i++) {
        combinedRoot = new ASTNode('operator', 'AND', combinedRoot, createRule(rules[i]));
    }

    return combinedRoot;
};

const evaluateRule = (ast, data) => {
    if (ast.type === 'operand') {
        const [attribute, operator, value] = ast.value.split(' ');
        if (operator === '>') return data[attribute] > parseFloat(value);
        if (operator === '<') return data[attribute] < parseFloat(value);
        if (operator === '=') return data[attribute] === value;
    } else if (ast.type === 'operator') {
        const leftResult = evaluateRule(ast.left, data);
        const rightResult = evaluateRule(ast.right, data);
        if (ast.value === 'AND') return leftResult && rightResult;
        if (ast.value === 'OR') return leftResult || rightResult;
    }
    return false;
};

module.exports = { combineRules, evaluateRule };
