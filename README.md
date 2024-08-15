# Rule Engine Application

## Overview

This is a 3-tier rule engine application designed to determine user eligibility based on attributes like age, department, income, spend, etc. The system uses an Abstract Syntax Tree (AST) to represent conditional rules and allows for dynamic creation, combination, and modification of these rules.

## Features

- **AST-Based Rule Representation:** Efficiently represents and manipulates complex logical rules.
- **Dynamic Rule Creation and Modification:** Create and modify rules dynamically using a simple API.
- **Rule Combination:** Combine multiple rules into a single, optimized rule.
- **Rule Evaluation:** Evaluate rules against user attributes to determine eligibility.
- **Error Handling:** Handles invalid rule strings and data formats.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other:** AST, JSON

## API Endpoints

### 1. `POST /api/rules/create`

- **Description:** Creates an AST from a rule string.
- **Body:**
  ```json
  {
    "rule_string": "(age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')"
  }
