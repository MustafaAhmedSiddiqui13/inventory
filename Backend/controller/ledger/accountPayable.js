const accountPayable = require("../../models/ledgers/accountPayable");

const getAccountPayable = async (req,res)=>{
    try{
        const account = req.body.account;
        const result  = await accountPayable.find({name:account})
        res.json(result);
    } catch(e){
        console.log(e)
        res.json(e)
    }
}

module.exports={getAccountPayable}