import sr from 'sequelize';
import sequelize from '../connectors/db.js';
let DataTypes = sr.DataTypes;
let Model = sr.Model;

class Role extends Model {}
Role.init({
    name: { type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: {
                msg: 'El nombre del rol es obligatorio'
            } }
    },
    level : { type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notNull: {
                msg: 'El level es obligatorio'
            } }
    },
}, {
    sequelize,
    modelName: "Role"
});

 
export default Role;