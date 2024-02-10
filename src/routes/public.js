import  express from 'express';
import  PublicController from '../controllers/public_controller.js';
import  UserController from '../controllers/auth/user_controller.js';
import RoleController from '../controllers/auth/role_controller.js';

let router = express.Router();

router.get('/healthcheck', PublicController.healthCheck);
router.get('/role-seed', RoleController.seed);
/* router.get('/validate', UserController.validateToken);*/
router.post('/login', UserController.login); 


export default router;
