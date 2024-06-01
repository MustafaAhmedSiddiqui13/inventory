const accountReceivable = require("../../models/ledgers/accountReceivable");

const getAccountReceivable = async (req,res)=>{
    try{
        const account = req.body.account;
        const result  = await accountReceivable.find({name:account})
        res.json(result);
    } catch(e){
        console.log(e)
        res.json(e)
    }
}

module.exports={getAccountReceivable}