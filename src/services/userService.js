import bcrypt from 'bcryptjs';
import db from '../models/index';

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


module.exports = {
    handleUserLogin:handleUserLogin,
    checkUserEmail:checkUserEmail,
    getAllUsers:getAllUsers
}