module.exports = function (hbs) {
  hbs.registerHelper("ifeq", function (a, b, options) {
      console.log(a, b);
    if (a == b) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  hbs.registerHelper("ifUnd", function(a, options){
    if(a ===undefined){
        return options.fn(this);
    }
    return options.inverse(this);
  })
};
