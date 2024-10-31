import express from 'express';

import homeController from '../controllers/homeController';
import userController from '../controllers/userController';

let router=express.Router();

let initWebRoutes= (app)=>{

    router.get('/', homeController.getHomePage )
    router.get('/about', homeController.getAboutPage )
    router.get('/crud', homeController.getCRUD ) // Enter new User infor
    router.post('/post-crud', homeController.postCRUD ) // Create a new User
    router.get('/get-crud',homeController.displayGetCRUD)// Display all users
    router.get('/delete-crud',homeController.deleteCRUD) // Delete user by ID

    router.get('/edit-crud',homeController.editCRUD)// just show infor of the select user
    router.post('/put-crud',homeController.putCRUD)// Edit user


   

    // Front end call these api belove
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);

    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);



    // rest api standar
    return app.use("/", router)
}

module.exports = initWebRoutes;