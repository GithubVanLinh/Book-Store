const userModel = require("../models/user.model");


module.exports = {
    getAccountInfo: (req, res, next) => res.render('user/my-account', { title: 'Express' }),
    checkLogin: (req, res, next) => {
        const password = req.body.password;
        const email = req.body.email;
        console.log(email);
        console.log(password);
        if(userModel.checkPassword(email, password)){
            res.redirect('/');
        }else
        res.redirect('user/login');
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

    }
  };