const nodemailer = require("nodemailer");
const crypto = require("crypto");

const User = require("../databases/user");
const userService = require("../service/user-service")

//function
async function checkEmailExists(email) {
  // console.log("checkEmailExists.", "email: ", email);
  const isExists = await User.exists({ email: email, status: "Active" });
  // console.log("checkEmailExists.", "isExists: ", isExists);
  return isExists;
}

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
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
  getActivedUserInfo: async (id) => {
    const usrData = await User.findOne({ _id: id, status: "Active" });
    return usrData;
  },
  getAllUser: async () => {
    const allUser = await User.find({ show: true }).exec();
    console.log(allUser);
    return allUser;
  },

  addNewAccount: async (accountInfo) => {
    const newUser = { ...accountInfo };
    console.log("User info: ", newUser);

    if (await checkEmailExists(accountInfo.email)) {
      console.log("addNewAccount.", "Email has been used");
      return { status: -1, err: "Email is already used" };
    }

    // const saltRounds = 10;
    // let userRes = {}
    // try {
    //   const salt = await bcript.genSalt(saltRounds);
    //   // console.log("hash: ", hash);
    //   const hashedPassword = await bcript.hash(newUser.password, salt)
    //   // console.log("hash: ", hashResult)
    //   userRes = await User.create({ ...newUser, password: hashedPassword })
    // } catch (err) {
    //   console.log("Error hash password", err)
    // }
    const userRes = await userService.hashPasswordAndCreateNewAccount(newUser);

    //send mail
    const PORT = process.env.PORT || 3000
    const host = `http://localhost:${PORT}`;
    // // console.log(host);
    const link = host + "/users/verify?id=" + userRes._id + "&email=" + userRes.email;
    const message = {
      from: process.env.MAIL_USERNAME,
      to: userRes.email,
      subject: "BookStore - Verify your account",
      text: link,
      html: "<p>To verify your BookStore account, <a href='" + link + "'>click me</a></p>",
    };
    console.log("Message: ", message);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
    // send mail with defined transport object
    try {
      let info = await transporter.sendMail(message);
      // console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.log("Error send email: ", error)
      return { status: -1, err: "Can not send email" }
    }

    return { status: 1, err: "" };
  },

  register: async (user) => {
    console.log(user);
    const res = await User.create(user);
    return res;
  },

  login: async (usr, pwd) => {
    const isEmailExists = await checkEmailExists(usr);
    if (isEmailExists) {
      // const usrData = await User.findOne({ email: usr, show: true });
      // console.log("Login", "userData", usrData);
      // console.log("login", "salt", usrData.salt);
      // console.log("login", "pwd", pwd);
      // const pass = hashPwd(usrData.salt, pwd);
      // console.log("login", "pass", pass);
      // if (usrData.password === pass) {
      //   return 1;
      // } else {
      //   return 0;
      // }
    }
    return -1;
  },

  vertify: async (email, id) => {
    const query = { _id: id, email: email, status: "Pending" };
    let result = false;

    try {
      await User.findOneAndUpdate(query, { status: "Active" });
      result = true;
    } catch (error) {
      console.log("Error: verify email failed, cannot update account status to \"Active\"");
    }
    return result;
  },


};
