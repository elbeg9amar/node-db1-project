const { response } = require('express');
const express = require('express');
const router = express.Router();


const db = require('../data/dbConfig');
const {validataBudgetId, validateNewBudget} = require('./budgetValidation')

router.get('/', (req,res) => {
    db.select('*').from('accounts')
    .then(datas => {
        res.status(200).json({data: datas})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    });
});

router.get('/:id', validataBudgetId, (req,res) => {
    db('accounts').where('id', '=', req.params.id)
    .then(acc => {
        res.status(200).json(acc)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'error occured while gettig data by Id'})
    });
});

router.post('/', validateNewBudget , (req,res) => {
    db('accounts').insert(req.body, 'id')
    .then(ids => {
        res.status(200).json({data: ids})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'error occured while posting new data'})
    });
});

router.delete('/:id', validataBudgetId, (req,res) => {
    db('accounts').where({id : req.params.id }).delete()
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'error occured while deleting data'})
    });
});

router.put('/:id', validataBudgetId, (req,res) => {
    const changes = req.body;
    db('accounts').where({id : req.params.id }).update(changes)
    .then(count => {
        res.status(200).json({data: count})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "error occured while updating the data"})
    })
})

module.exports = router;