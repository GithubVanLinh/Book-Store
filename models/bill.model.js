const Bill = require('../databases/bill');

module.exports = {
    createBill: (billData)=>{
        console.log(billData);

        Bill.create(bill)
    }
}