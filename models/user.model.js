const nodemailer = require("nodemailer");

var path = require("path");

const User = require("../databases/user");
const VertifyModel = require("../models/vertify.model");
const passport = require("passport");
const crypto = require("crypto");

//function
async function checkEmailExists(email) {
  console.log("checkEmailExists.", "email: ", email);
  const isExists = await User.exists({ email: email, show: true });
  console.log("checkEmailExists.", "isExists: ", isExists);
  return isExists;
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
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
  getUserInfo: async (email) => {
    const usrData = await User.findOne({ email: email, show: true });
    return usrData;
  },
  getAllUser: async () => {
    const allUser = await User.find({ show: true }).exec();
    console.log(allUser);
    return allUser;
  },

  addNewAccount: async (accountInfo) => {
    console.log("addNewAccount.", "accountInfo: ", accountInfo);

    const newUser = accountInfo;
    console.log("addNewAccount.", "newUser: ", accountInfo);

    const isEmailExists = await checkEmailExists(accountInfo.email);

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

    const keyId = makeid(10);

    newUser.id = keyId;

    // // Regist Email is not exists
    // const userRes = await User.create(newUser);
    const userRes = await VertifyModel.addNewVertify(newUser);
    console.log("addNewAccount.", "username: ", userRes);

    //send mail

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: process.env.username,
          pass: process.env.password
      }
  });

  const host = "http://localhost:3000";

  console.log(host);

  const link =host+ "/users/vertify?id=" + keyId +"&email="+ userRes.email;
    var message = {
      from: "goi@gmail.com",
      to: userRes.email,
      subject: "confirm email",
      text: link,
      html: "<p>HTML version of the message <a href='" +link+"'>link</a></p>",
    };

    console.log("link", link);
    // send mail with defined transport object
    let info = await transporter.sendMail(message);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return 1;
  },
  register: async (user)=>{
    console.log(user);
    const res = await User.create(user);
    return res;
  }
  ,
  login: async (usr, pwd) => {
    const isEmailExists = await checkEmailExists(usr);
    if (isEmailExists) {
      const usrData = await User.findOne({ email: usr, show: true });
      console.log("Login", "userData", usrData);
      console.log("login", "salt", usrData.salt);
      console.log("login", "pwd", pwd);
      const pass = hashPwd(usrData.salt, pwd);
      console.log("login", "pass", pass);
      if (usrData.password === pass) {
        return 1;
      } else {
        return 0;
      }
    }
    return -1;
  },
};
