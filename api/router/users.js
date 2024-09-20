import { Router } from 'express';
import { userController } from '../controllers/usersController.js';
import  validators  from '../middlewares/validator.js';

const userRouter = Router();

// get all users
userRouter.get('/api/users', userController.getAllUsers);

// get a user by id
userRouter.get('/api/users/:user_id(\\d+)', userController.getOneUserById);

// get all teachers
userRouter.get('/api/teachers', userController.getAllTeachers);

// create a user
userRouter.post('/api/users', validators('users'), userController.createUser);

// update a user
userRouter.patch(
    '/api/users/:user_id(\\d+)',
    validators('users'), 
    userController.updateUser
);

// delete a user
userRouter.delete('/api/users/:user_id(\\d+)', userController.deleteUser);

export { userRouter };
