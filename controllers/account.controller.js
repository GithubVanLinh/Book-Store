const accountModel = require("../models/account.model");


module.exports = {
    getAccountInfo: (req, res, next) => res.render('account/my-account', { title: 'Express' }),
    checkLogin: (req, res, next) => {
        const password = req.body.password;
        const email = req.body.email;
        console.log(email);
        console.log(password);
        if(accountModel.checkPassword(email, password)){
            res.redirect('/');
        }else
        res.redirect('account/login');
    },
    login: (req, res, next) => {
        res.render('account/login');
    },
    register: (req, res, next)=>res.render('account/register'),
    addNewAccount: (req, res, next)=>{
        const accountInfo = req.body;
        if(accountModel.addNewAccount(accountInfo)){
            res.redirect('/login');
        }
        else res.redirect('/register');

    }
  };