// src/utils/ast.js
class ASTNode {
    constructor(type, value = null, left = null, right = null) {
        this.type = type; // "operator" or "operand"
        this.value = value; // Optional value for operand nodes
        this.left = left; // Reference to left child node
        this.right = right; // Reference to right child node (for operators)
    }
}

const parseCondition = (condition) => {
    // Tokenize the condition string
    const tokens = condition.match(/\S+/g);
    const stack = [];
    
    tokens.forEach(token => {
        if (['AND', 'OR'].includes(token)) {
            const right = stack.pop();
            const left = stack.pop();
            stack.push(new ASTNode('operator', token, left, right));
        } else {
            stack.push(new ASTNode('operand', token));
        }
    });

    return stack[0];
};

const createRule = (ruleString) => {
    try {
        const root = parseCondition(ruleString);
        return root;
    } catch (error) {
        throw new Error('Invalid rule string');
    }
};

module.exports = { ASTNode, createRule };
