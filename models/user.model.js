const User = require("../databases/user");
const passport = require('passport');
const crypto = require("crypto");

//function
async function checkEmailExists(email) {
  console.log("checkEmailExists.", "email: ", email);
  const isExists = await User.exists({ email: email, show: true });
  console.log("checkEmailExists.", "isExists: ", isExists);
  return isExists;
}

//return 1 if vaild
async function checkPassword(email, password) {
  for (account of accounts) {
    if (account.email === email && account.password === password) {
      return 1;
    }
  }
  return 0;
}

var hashPwd = function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac("sha256", salt);
  return hmac.update(pwd).digest("hex");
};

module.exports = {
  getUserInfo: async(email)=>{
    const usrData = await User.findOne({email: email, show: true});
    return usrData;
  },
  getAllUser: async () => {
    const allUser = await User.find({ show: true }).exec();
    console.log(allUser);
    return allUser;
  },

  addNewAccount: async (accountInfo) => {
    console.log("addNewAccount.", "accountInfo: ", accountInfo);;

    const newUser = accountInfo;
    console.log("addNewAccount.", "newUser: ", accountInfo);

    const isEmailExists = await checkEmailExists(accountInfo.email)

    if (isEmailExists) {
      console.log("addNewAccount.", "Email has been used");
      return -1;
    }

    const salt = crypto.randomBytes(128).toString("base64");

    //use password , create salt, hash and compare with the existing
    const passHash = hashPwd(salt, newUser.password);
    newUser.salt = salt;
    newUser.password = passHash;

    console.log("addNewAccount.", "newUserPassHash: ", accountInfo);

    // Regist Email is not exists
    const userRes = await User.create(newUser);
    console.log("addNewAccount.", "username: ", userRes);
    return userRes;
  },
  login: async (usr, pwd)=>{
    const isEmailExists = await checkEmailExists(usr);
    if (isEmailExists) {
      const usrData = await User.findOne({email: usr, show: true});
      console.log("Login", "userData", usrData);
      console.log("login", "salt", usrData.salt);
      console.log("login", "pwd", pwd);
      const pass = hashPwd(usrData.salt, pwd);
      console.log("login", "pass" , pass);
      if (usrData.password === pass){
        return 1;
      } else{
        return 0;
      }
    }
    return -1;
  }
};
