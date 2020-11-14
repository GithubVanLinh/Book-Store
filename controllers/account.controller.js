module.exports = {
    getAccountInfo: (req, res, next) => res.render('account/my-account', { title: 'Express' }),
    login: (req, res, next) => res.render('account/login'),
    register: (req, res, next)=>res.render('account/register'),
  };