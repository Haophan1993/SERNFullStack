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

let getAllUser= ()=>{

    return new Promise(async (resolve, reject)=>{
        try{
            let users= await db.User.findAll({
                raw: true}
            );
            resolve(users);

        }catch(e){
            reject(e);
        }
    })
}

let getUserInfoById=(userId)=>{

    return new Promise(async(resolve, reject)=>{
        try{

            let user= await db.User.findOne({
                where: {id:userId},  raw: true
            })
            if(user){
                resolve(user)
            }else{
                resolve({})
            }

        }catch(e){
            reject(e);
        }
    })

}

let updateUserData=(data)=>{
   

    return new Promise(async (resolve, reject)=>{
        try{
            let user = await db.User.findOne({where:{id: data.id}})
            
            
            if(user){

                await db.User.update({
                    firstName:data.firstName,
                    lastName:data.lastName,
                    address:data.address}, 
                    {where:{id:data.id}})
                

                
                let allUsers = await db.User.findAll()

                resolve(allUsers)
                

                
            }else{
                resolve(
                    
                );
            }
            

        }catch(e){
            reject(e)
        }
    })
   
}

let deleteUserbyId=(userId)=>{
    

    return new Promise( async(resolve, reject)=>{
        try{

            // let user = await db.User.findOne({
            //     where:{id:userId}
            // })
            // console.log(user);

            // if(user){
            //     await user.destroy()
            
            // }
            await db.User.destroy({ where: { id: userId } });

            let allUsers= await db.User.findAll();

            resolve(allUsers);
            



        }catch(e){
            reject(e)
        }
    })
}




module.exports = {
    createNewUser:createNewUser,
    getAllUser:getAllUser,
    getUserInfoById:getUserInfoById,
    updateUserData:updateUserData,
    deleteUserbyId:deleteUserbyId
    
}