const express = require("express");

const budgetRouter = require('../budget/budgetRouter')

const server = express();

server.use(express.json());

server.use('/api/budget', budgetRouter);

server.get('/', (req,res) => {
    res.status(200).json({api: "up"})
});

module.exports = server;
