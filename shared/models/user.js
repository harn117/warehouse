import sr from 'sequelize';
import sequelize from '../connectors/db.js';
import Role from './role.js';

let DataTypes = sr.DataTypes;
let Model = sr.Model;


class User extends Model {}
User.init({
    username: { type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notNull: {
                msg: 'El nombre del usuario es obligatorio'
            } }
    },
    status: { type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: { notNull: {
                msg: 'El nombre del usuario es obligatorio'
            } }
    },
    password : DataTypes.TEXT,
}, {
    sequelize,
    modelName: "User"
});
User.belongsTo(Role, {foreignKey: 'role_id'});
 
export default User;