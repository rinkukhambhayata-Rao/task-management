const mongoose = require("mongoose");
var userModel = require("../model/user.model");
var jwt = require("jsonwebtoken"); // Import JWT Package

const addUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        if(data.email != '' && data.name != '' && data.password){
            const foundUser = await userModel.find({email:data.email});
            console.log('user ',foundUser);
            if(foundUser != ''){
                reject({
                    status: 409,
                    data: foundUser,
                    message: "This email address is already in use",
                });
            }else{
                console.log('user not found');
                userModel.create(data)
                .then((userDetails) => {
                    console.log('user created successfully');
                    resolve({
                        status: 200,
                        data: userDetails,
                        message: "User created succesfully",
                    });
                }).catch((error) => {
                    console.log('error ', error);
                    reject({
                        status: 500,
                        message: "Internal server error",
                    });
                });
            }
        }else{
            reject({
                status: 400,
                message: "Please provide all required fields"
            });
        }
    })
}

const loginUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        if(data.email != '' && data.password){
            const foundUser = await userModel.find({email:data.email,password:data.password});
            if(foundUser != ''){
                const payload = { foundUser };
                console.log("login user details ", payload);
                const token = jwt.sign(payload, "pmt");
                console.log("Token = ", token);
                userModel.updateOne({ _id : new mongoose.Types.ObjectId(foundUser._id) }, { $set: { "token": token } });
                resolve({
                    status: 200,
                    data: foundUser,
                    message: "You have been logged in to the system successfully",
                });
            }else{
                reject({
                    status: 400,
                    message: "Details you have provided seems to be invalid. Please try with valid credentials",
                });
            }
        }else{
            reject({
                status: 400,
                message: "Please provide all required fields"
            });
        }
    })
}

module.exports.addUser = addUser;
module.exports.loginUser = loginUser;
