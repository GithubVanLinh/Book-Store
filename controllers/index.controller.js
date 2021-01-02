const ProductModel = require('../models/book.model')

module.exports = {
    getHomePage: (req, res, next)=>{
        res.render('index', { title: 'Express'/*, productList: ProductModel.getAllBook()*/})
    },
    getLoginPage: (req, res, next) => res.redirect('/users/login'),
    getRegisterPage: (req, res, next) => res.redirect('/users/register'),
    getWrongPage: (req, res, next) => res.render('error', {message: "URL not found!"}),
}