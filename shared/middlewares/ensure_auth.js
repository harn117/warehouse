import jwt from 'jwt-simple';
import _ from "../../config/global.js";
import moment from "moment";
import User from "../models/user.js";
import Role from "../models/role.js";


let middleware = {
    user: async (req, res, next) => {
        try {
            if (!req.headers.authorization) return res.status(403).send({message: 'NO_AUTHORIZATION', code: 11.1})
            let token = req.headers.authorization.split(" ")[1];
            let authData = jwt.decode(token, _.TOKEN_SECRET);
            if (authData.exp <= moment().unix()) {
                return res.status(408).send({error: "EXPIRE_TOKEN", code: 11.2});
            }
            let user = await User.findByPk(authData.sub.user);
            if (!user) return res.status(403).send({message: 'INVALID_USER', code: 11.3});
            if (user.status == 0) return res.status(403).send({message: 'INVALID_USER', code: 11.4});
            if (user.codeRole === false) res.status(405).send({message: 'DISABLED_USER', code: 11.5});
            let role = await Role.findByPk(user.dataValues.role_id);
            if (role.dataValues.level !== 99) res.status(405).send({message: 'INVALID_ROLE', code: 11.6});
            req.user = user.id;
            req.role = role.level;
            next();
        } catch (e) {
            console.log("ERR 11.500", e);
            return res.status(401).send({error: e.message, message: "TOKEN_INVALID", code: 11.500});
        }
    }
}


export default middleware;
