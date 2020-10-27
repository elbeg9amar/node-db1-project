const db = require('../data/dbConfig');

module.exports = {
    validataBudgetId,
    validateNewBudget
}

function validataBudgetId(req,res,next) {
    const id = Number(req.params.id)
    db.select('*').from('accounts')
        .then(datas => {
            if(datas.find(data => data.id === id)){
                next()
            }else {
                res.status(404).json({message: "invalid budget id"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "error occured while validating action's id"})
        });
};

function validateNewBudget(req,res,next) {
    const body =req.body;
    if(Object.keys(body).length === 0){
        res.status(400).json({message: "missing budget data"})
    }else if (!body.name || !body.budget){
        res.status(400).json({error:"required fields are missing"})
    }else {
        next()
    };
};