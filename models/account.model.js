const accounts = [
    {
        email: "admin1@g.com",
        password: "1",
        first_name: "A",
        last_name: "B",
        mobile_number: "0123456789"
    },
    {
        email: "admin2g.com",
        password: "1",
        first_name: "A",
        last_name: "B",
        mobile_number: "0123456789"
    },
    {
        email: "admin3@g.com",
        password: "1",
        first_name: "A",
        last_name: "B",
        mobile_number: "0123456789"
    }
]

module.exports = {
    //return 1 if vaild
    checkPassword:(email, password)=>{
        for(account of accounts){
            if(account.email === email && account.password === password){
                return 1;
            }
        }
        return 0;
    },
    addNewAccount:(accountInfo)=>{
        for(account of accounts){
            if(account.email === accountInfo.email){
                return 0;
            }
        }

        accounts.push(accountInfo);
        return 1;
    }
}