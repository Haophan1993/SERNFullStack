import bcrypt from 'bcryptjs';

import db from '../models/index';
const salt= bcrypt.genSaltSync(10);

let createNewUser = async (data)=>{

    return new Promise(async (resolve, reject)=>{

        try{
            let hasPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({

                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hasPasswordFromBcrypt,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender==='1'? true:false,
                image: '',
                roleId: data.roleId,
                positionId: '',



            })
            resolve('create a new user succeed!!')

            

        }catch(e){
            reject(e);

        }

    })
    
}

let hashUserPassword = (password)=>{
    return new Promise( async (resolve, reject)=>{
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)

        }catch(e){
            reject(e)

        }
        
        

    })
}

module.exports = {
    createNewUser:createNewUser
}