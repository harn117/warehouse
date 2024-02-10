import db from '../connectors/db.js';

import User from './user.js';
import Role from './role.js';
import Product from './product.js';
import Warehouse from './warehause.js';
import Item from './item.js';
import Action from './action.js';


// foreing Key User to role
User.belongsTo(Role);
Role.hasMany(User); 

// foreing Key Item to role
Item.belongsTo(Warehouse);
Warehouse.hasMany(Item); 

// foreing Key Action to warehause
Action.belongsTo(Warehouse, {foreignKey: 'warehouse'});
Action.belongsTo(Warehouse, {foreignKey: 'destination'});
Action.belongsTo(Product, {foreignKey: 'product'});
Warehouse.hasMany(Action); 
Product.hasMany(Action); 
