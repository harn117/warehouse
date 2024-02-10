import  express from 'express';
import AuthMiddleware from '../../shared/middlewares/ensure_auth.js';
import UserController from '../controllers/auth/user_controller.js';
import RoleController from '../controllers/auth/role_controller.js';
import ProductController from '../controllers/product_controller.js';
import WarehouseController from '../controllers/warehouse_controller.js';
import ItemController from '../controllers/item_controller.js';
import ActionController from '../controllers/action_controller.js';
let router = express.Router();

router.use(AuthMiddleware.user);

router.route('/users/:id?')
    .get(UserController.get)
    .post(UserController.store)
    .put(UserController.store)
    .delete(UserController.delete);

router.route('/roles/:id?')
    .get(RoleController.get)
    .post(RoleController.store)
    .put(RoleController.store)
    .delete(RoleController.delete);

router.route('/products/:id?')
    .get(ProductController.get)
    .post(ProductController.store)
    .put(ProductController.store)
    .delete(ProductController.delete);

router.route('/warehouses/:id?')
    .get(WarehouseController.get)
    .post(WarehouseController.store)
    .put(WarehouseController.store)
    .delete(WarehouseController.delete);

router.route('/items/:id?')
    .get(ItemController.get)
    .post(ItemController.store)
    .put(ItemController.store)
    .delete(ItemController.delete);

router.route('/actions/:id?')
    .get(ActionController.get)
    .post(ActionController.store)
    .put(ActionController.store)
    .delete(ActionController.delete);



export default router;