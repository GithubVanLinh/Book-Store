module.exports ={
    getHomePage: (req, res, next)=>res.render('index', { title: 'Express' }),
    getLoginPage: (req, res, next) => res.redirect('/account/login'),
    getRegisterPage: (req, res, next) => res.redirect('/account/register'),
    getWrongPage: (req, res, next) => res.render('error', {message: "URL not found!"}),
}