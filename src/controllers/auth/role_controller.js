import RoleModel from '../../../shared/models/role.js'
//import SeedHelper from '../../shared/helpers/seed-helper.js';

import _ from '../../../config/global.js'

let controller = {
    /**
     * Esta función obtiene los roles creados.
     * @param {object} req -  objeto que contiene información sobre la petición HTTP
     * @param {object} res - objeto que representa la respuesta HTTP que envía.
     * @returns {object} la información de(l) (los) rol(s).
     */
    get: async (req, res) => {
        try {
            if (req.params.id) {
                let role = await RoleModel.findByPk(req.params.id );
                if(!role) return res.status(400).send({error:"role_NOT_FOUND", code: 200.1});
                return res.status(200).send({data: role});
            } else {
                let roles = await RoleModel.findAndCountAll();
                if(!roles) return res.status(400).send({error:"roleS_NOT_FOUND", code: 200.2});
                return res.status(200).send({data: roles});
            }
        } catch (e) {
            console.log("e: ", e);
            return res.status(500).send({error: e, message: "ERROR GENERAL", code: 200.3});
        }
    },
    /**
     * Esta función guarda o edita la información del rol.
     * @param {object} req -  objeto que contiene información sobre la petición HTTP
     * @param {object} res - objeto que representa la respuesta HTTP que envía.
     * @returns {object} la información del rol creado/modificada.
     */
    store: async (req, res) => {
        try {
            let data = req.body;
            if (!req.params.id) {
                let role = await RoleModel.create(data);
                if(!role) return res.status(400).send({error:"role_NOT_CREATED", code: 201.1});
                return res.status(200).send({data: role});
            } else {
                let role = await RoleModel.update(data, {  where: { id: req.params.id }  });
                if(!role) return res.status(400).send({error:"role_NOT_UPDATE", code: 201.2});
                return res.status(200).send({data: role});
            }
        } catch (e) {
            console.log("e: ", e);
            return res.status(500).send({error: e, message: "ERROR role NO CREATE", code: 201.3});
        }
    },
    /**
     * Esta función elimina a un rol por su id.
     * @param {object} req -  objeto que contiene información sobre la petición HTTP
     * @param {object} res - objeto que representa la respuesta HTTP que envía.
     * @returns {object} el envio del mensaje si ha sido removido o si hubo error.
    */
    delete : async (req, res) => {
        try{ 
            if(!req.params.id) return res.status(404).send({ error :  "ID ERROR", message : "NO FOUND ID PARAM", code : 202.1});
            await RoleModel.destroy({ where: {  id: req.params.id  }  });
            return res.status(200).send({ data :  "DELETED" });
        }catch(e){ 
            console.log(e);
            return res.status(500).send({ error :  "GENERAL ERROR", message : e.message, code : 202.2});
        }
    },
    /**
    * Esta función semilla que crea los roles de admin y consulta.
    * @param {object} req -  objeto que contiene información sobre la petición HTTP.
    * @param {object} res - objeto que representa la respuesta HTTP que envía.
    * @returns {object} mensaje de confirmación o error del proceso.
   */
    seed: async (req, res) => {
        try {
            const config = await RoleModel.findAndCountAll();
            console.log("config: ", config);
            if (config.rows.length == 0) {
                const newConfig = await RoleModel.bulkCreate([
                    {
                        "id":  1,
                        "name":  "admin",
                        "level": 99
                    },
                    {
                        "id":  2,
                        "name":  "consulta",
                        "level": 10
                    }
                ]);
                if (!newConfig) res.status(403).send({error: "NOT CREATE SEED", code: 204.1});
                return res.status(200).send({data: 'SUCCESSFUL'});
            }
            return res.status(200).send({message: 'SEED UP'});
        } catch (e) {
            console.log(e);
            return res.status(500).send({error: "GENERAL ERROR", message: e.message, code: 204.2});
        }
    }, 
}
export default  controller;