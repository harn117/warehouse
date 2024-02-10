import sr from 'sequelize';
import sequelize from '../connectors/db.js';
let DataTypes = sr.DataTypes;
let Model = sr.Model;

class Product extends Model {}
Product.init({
    name: { type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notNull: {
                msg: 'El nombre del usuario es obligatorio'
            } }
    },
    price: { type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: { notNull: {
                msg: 'El email del usuario es obligatorio'
            } }
    },
}, {
    sequelize,
    modelName: "Product"
});

 
export default Product;