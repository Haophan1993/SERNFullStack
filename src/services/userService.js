import bcrypt from 'bcryptjs';
import db from '../models/index';


const salt= bcrypt.genSaltSync(10);
let handleUserLogin = (email, password)=>{

    return new Promise(async (resolve, reject)=>{
        try{
            let userData={};
            let isExit= await checkUserEmail(email)
            if(isExit){
                //user already Exist
                //Compare password
                let user= await db.User.findOne({
                    
                    where:{ email:email
                    },
                    raw:true
                })
                if(user){
                    // compare password
                    let check = await bcrypt.compareSync(password,user.password);
                    if (check){
                        userData.errCode=0;
                        userData.errMessage='OK';
                        delete user.password;
                        userData.user=user;
                    }else{
                        userData.errorCode=3;
                        userData.errMessage='Wrong password'
                    }

                }else{
                    userData.errorCode=2;
                    userData.errMessage =`User not foud`;

                }
                
            }else{
                userData.errorCode=1;
                userData.errMessage =`Your email is not exist in your system`;
                
                
            }
            resolve(userData)

        }catch(e){
            reject(e)
        }
    })

}



let checkUserEmail = (userEmail)=>{

    return new Promise(async (resolve, reject)=>{
        try{
            let user = await db.User.findOne({
                where :{email:userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }

        }catch(e){
            reject(e)
        }
    })
}

let getAllUsers = (userId)=>{
    return new Promise (async (resolve, reject)=>{

        try{
            let users = ''
            if(userId==='ALL'){
                users= await db.User.findAll({
                    attributes:{
                        exclude:['password']
                    }

                })
            }
            if(userId&& userId!=='ALL'){

                users = await db.User.findOne({
                    where:{ id: userId}, 
                    attributes:{
                        exclude:['password']
                    }
                })

            }

            resolve(users)

        }catch(e){
            reject(e)
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

let createNewUserAPI = async (data)=>{
    

    return new Promise(async (resolve, reject)=>{

        try{
            let check = await checkUserEmail(data.email);
            if(check===true){
                resolve({
                    errCode: 1,
                    message: 'Email already existed'
                })

            }
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
            resolve({
                errCode:0,
                message: 'OK'
            })

            

        }catch(e){
            reject(e);

        }

    })
    
}

let deleteUser = async (userID)=>{
    return new Promise (async(resolve, reject)=>{
        let user = await db.User.findOne({
            where:{id:userID }
        })

        if(!user){
            resolve({
                errCode:2,
                errMessage: 'user is not exist'
            })
        }


        try{

            await db.User.destroy({ where: { id: userID } });

            let allUsers= await db.User.findAll(); // after delete user, return the remaining user list.

            resolve(allUsers);

        }catch(e){
            reject(e)
        }
    })
}

let updateUserData = async (data)=>{
    return new Promise(async(resolve, reject)=>{
        try{

            if(!data.id){
                resolve({
                    errCode:2,
                    message:'Missing required parameters!'
                })
            }


            let user = await db.User.findOne({where:{id: data.id}})
            
            
            if(user){

                await db.User.update({
                    firstName:data.firstName,
                    lastName:data.lastName,
                    address:data.address}, 
                    {where:{id:data.id}})
                

                
                    resolve({
                        errCode:0,
                        message:' Update user succeds'
                    });
                

                
            }else{
                resolve(
                    {
                        errCode:1,
                        message: 'User is not found'
                    }
                );
            }

            

        }catch(e){
            reject(e);
        }
    })
}




module.exports = {
    handleUserLogin:handleUserLogin,
    checkUserEmail:checkUserEmail,
    getAllUsers:getAllUsers,
    createNewUserAPI:createNewUserAPI,
    deleteUser:deleteUser,
    updateUserData:updateUserData,
}