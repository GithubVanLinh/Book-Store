const Bill = require('../databases/bill');

module.exports = {
  createBill: async (bill) => {
    // console.log(bill);
    return await Bill.create(bill)
  }
}