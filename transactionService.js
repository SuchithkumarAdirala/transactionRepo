const db = require('./database');

// Function to add a new transaction
function addTransaction(transaction, callback) {
  const { type, amount, description, date, running_balance } = transaction;
  const query = `
    INSERT INTO transactions (type, amount, description, date, running_balance)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(query, [type, amount, description, date, running_balance], function(err) {
    callback(err, this.lastID);
  });
}

// Function to get all transactions
function getAllTransactions(callback) {
  const query = 'SELECT * FROM transactions';
  db.all(query, [], (err, rows) => {
    callback(err, rows);
  });
}

// Function to update a transaction
function updateTransaction(id, updates, callback) {
  const { type, amount, description, date, running_balance } = updates;
  const query = `
    UPDATE transactions
    SET type = ?, amount = ?, description = ?, date = ?, running_balance = ?
    WHERE id = ?
  `;
  db.run(query, [type, amount, description, date, running_balance, id], function(err) {
    callback(err, this.changes);
  });
}

module.exports = {
  addTransaction,
  getAllTransactions,
  updateTransaction
};
