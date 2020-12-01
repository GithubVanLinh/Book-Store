// const accounts = [
//     {
//         email: "admin1@g.com",
//         password: "1",
//         first_name: "A",
//         last_name: "B",
//         mobile_number: "0123456789"
//     },
//     {
//         email: "admin2g.com",
//         password: "1",
//         first_name: "A",
//         last_name: "B",
//         mobile_number: "0123456789"
//     },
//     {
//         email: "admin3@g.com",
//         password: "1",
//         first_name: "A",
//         last_name: "B",
//         mobile_number: "0123456789"
//     }
// ]
const User = require("../databases/user");

//function
checkEmailExists = async function (email) {
  console.log(email);
  const isExists = await User.exists({ email: email });
  console.log(isExists);
  return isExists;
};

//return 1 if vaild
checkPassword=  (email, password) => {
  for (account of accounts) {
    if (account.email === email && account.password === password) {
      return 1;
    }
  }
  return 0;
};

module.exports = {
  getAllUser: async () => {
    const allUser = await User.find().exec();
    console.log(allUser);
    return allUser;
  },

  addNewAccount: async (accountInfo) => {
    const isEmailExists = await checkEmailExists(accountInfo.email);
    if (isEmailExists) {
      console.log("Email has been used");
      return -1;
    }
    //Regist Email is not exists
    const userRes = await User.create(accountInfo);
    console.log(userRes);
    return userRes;
  },
};
