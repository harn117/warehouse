import sr from 'sequelize';
import sequelize from '../connectors/db.js';
let DataTypes = sr.DataTypes;
let Model = sr.Model;

class Warehouse extends Model {}
Warehouse.init({
    name: { type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notNull: {
                msg: 'El nombre de la bodega es obligatorio'
            } }
    },
    capacity: { type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notNull: {
                msg: 'El campo capacity es obligatorio'
            } }
    },
}, {
    sequelize,
    modelName: "Warehouse"
});

 
export default Warehouse;