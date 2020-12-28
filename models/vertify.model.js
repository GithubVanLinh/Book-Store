const Vertify = require('../databases/vertify_user');
const UserModel = require('../models/user.model');
const User = require("../databases/user");

module.exports = {
    vertify: async (email, ida)=>{
        console.log(email, ida);
        const res = await Vertify.findOne({id: ida});
        console.log(res);

        if (res!=null && res!= {} && res.email === email){
            const newUser={};
            newUser.full_name = res.full_name;
            newUser.email= res.email;
            newUser.phone_number=res.phone_number;
            newUser.password = res.password;
            newUser.salt = res.salt;

            console.log("vertify","res", newUser);
            await User.create(newUser);
            await Vertify.deleteMany({email: email});
            return 1;
        }
        return 0;
    },
    addNewVertify: async (info)=>{
        const res = await Vertify.create(info);
        return res;
    }
}