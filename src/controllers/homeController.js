import { json } from 'sequelize';
import db from '../models/index';

let getHomePage = async (req, res)=>{
    try{
        let data = await db.User.findAll();
        console.log('------------------------')
        console.log(data);
        console.log('------------------------')
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    }catch(e){
        console.log(e)
    }

    //return res.render('homepage.ejs')
    
   
}

let getAboutPage = (req,res)=>{
    return res.render('about.ejs')
}

module.exports={
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
}