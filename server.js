const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const transactionService = require('./transactionService');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Export app for testing
module.exports = app;


// Add a new transaction
app.post('/transactions', (req, res) => {
  const transaction = req.body;
  transactionService.addTransaction(transaction, (err, id) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add transaction' });
    } else {
      res.status(201).json({ id });
    }
  });
});

// Retrieve all transactions
app.get('/transactions', (req, res) => {
  transactionService.getAllTransactions((err, transactions) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve transactions' });
    } else {
      res.status(200).json(transactions);
    }
  });
});

// Update a transaction
app.put('/transactions/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  transactionService.updateTransaction(id, updates, (err, changes) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update transaction' });
    } else if (changes === 0) {
      res.status(404).json({ error: 'Transaction not found' });
    } else {
      res.status(200).json({ success: true });
    }
  });
});
