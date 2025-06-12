import express from 'express';
import { createUser, getAllUser, login, logoutUser } from '../Controller/authController.js';
const routesuser = express.Router();

routesuser.route('/signup').post(createUser)
routesuser.route('/login').post(login)
routesuser.route('/getusers').get(getAllUser)
routesuser.route('/logout').post(logoutUser)

export default routesuser;
