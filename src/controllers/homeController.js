import { json } from 'sequelize';
import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res)=>{
    try{
        let data = await db.User.findAll();
        // console.log('------------------------')
        // console.log(data);
        // console.log('------------------------')
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    }catch(e){
        console.log(e)
    }

    
    
   
}

let getAboutPage = (req,res)=>{
    return res.render('about.ejs')
}

let getCRUD = (req, res)=>{

    return res.render('crud.ejs')
}

let postCRUD = async (req, res)=>{
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('Post CRUD')
}

let displayGetCRUD = async (req,res)=>{

    let dataTable = await CRUDService.getAllUser();
    

    return res.render('displayCRUD.ejs', {data: dataTable});
}

let editCRUD = async (req, res)=>{
    let userId=req.query.id;
    
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        console.log(userData);
        return res.render('editCRUD.ejs', {
            user:userData
        });

    }else{
        return res.send('User not found');

    }

    
    
    

}


let putCRUD = async (req,res)=>{

    let data=req.body;
   let addUsers = await CRUDService.updateUserData(data);

   return res.render('displayCRUD.ejs', {data: addUsers});
}



let deleteCRUD= async (req, res)=>{
    console.log(req.body)
    let id=req.query.id;
    let afterDeleteUsers= await CRUDService.deleteUserbyId(id);
   
    return res.render('displayCRUD.ejs', {data: afterDeleteUsers});
}






module.exports={
    getHomePage: getHomePage,
    getAboutPage: getAboutPage, 
    getCRUD: getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,
    editCRUD:editCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD
}