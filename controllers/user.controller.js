const userModel = require("../models/user.model");


module.exports = {
    getAccountInfo: (req, res, next) => res.render('user/my-account', { title: 'Express' }),
    checkLogin: async (req, res, next) => {
        const password = req.body.password;
        const email = req.body.email;
        console.log(email);
        console.log(password);

        const loginStatus =await userModel.login(email, password);
        console.log("checkLogin", "loginStatus", loginStatus);
        if(loginStatus === 1){
            res.redirect('/');
        }else{
            res.render('user/login', {error: true});
        }
    },
    login: (req, res, next) => {
        res.render('user/login');
    },
    register: (req, res, next)=>res.render('user/register'),
    addNewAccount: (req, res, next)=>{
        const userInfo = req.body;
        if(userModel.addNewAccount(userInfo)){
            res.redirect('/login');
        }
        else res.redirect('/register');

    },
    logout: (req, res, next)=>{
        req.logout();
        res.redirect('/');
    }
  };