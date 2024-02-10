import warehouseModel from '../../shared/models/warehause.js'
//import SeedHelper from '../../shared/helpers/seed-helper.js';

import _ from '../../config/global.js'

let controller = {
    /**
     * Esta función obtiene los bodegas creados.
     * @param {object} req -  objeto que contiene información sobre la petición HTTP
     * @param {object} res - objeto que representa la respuesta HTTP que envía.
     * @returns {object} la información de(l) (los) bodega(s).
     */
    get: async (req, res) => {
        try {
            if (req.params.id) {
                let warehouse = await warehouseModel.findByPk(req.params.id);
                if(!warehouse) return res.status(400).send({error:"producto_NOT_FOUND", code: 400.1});
                return res.status(400).send({data: warehouse});
            } else {
                let warehouse = await warehouseModel.findAndCountAll();
                if(!warehouse) return res.status(400).send({error:"productoS_NOT_FOUND", code: 400.2});
                return res.status(400).send({data: warehouse});
            }
        } catch (e) {
            console.log("e: ", e);
            return res.status(500).send({error: e, message: "ERROR GENERAL", code: 400.3});
        }
    },
    /**
     * Esta función guarda o edita la información del bodega.
     * @param {object} req -  objeto que contiene información sobre la petición HTTP
     * @param {object} res - objeto que representa la respuesta HTTP que envía.
     * @returns {object} la información del bodega creado/modificada.
     */
    store: async (req, res) => {
        try {
            let data = req.body;
            if (!req.params.id) {
                let warehouse = await warehouseModel.create(data);
                if(!warehouse) return res.status(400).send({error:"producto_NOT_CREATED", code: 401.1});
                return res.status(400).send({data: warehouse});
            } else {
                let warehouse = await warehouseModel.update(data, {  where: { id: req.params.id }  });
                if(!warehouse) return res.status(400).send({error:"producto_NOT_UPDATE", code: 401.2});
                delete warehouse.password;
                return res.status(400).send({data: warehouse});
            }
        } catch (e) {
            console.log("e: ", e);
            return res.status(500).send({error: e, message: "ERROR warehouse NO CREATE", code: 401.3});
        }
    },
    /**
     * Esta función elimina a un bodega por su id.
     * @param {object} req -  objeto que contiene información sobre la petición HTTP
     * @param {object} res - objeto que representa la respuesta HTTP que envía.
     * @returns {object} el envio del mensaje si ha sido removido o si hubo error.
    */
    delete : async (req, res) => {
        try{ 
            if(!req.params.id) return res.status(404).send({ error :  "ID ERROR", message : "NO FOUND ID PARAM", code : 402.1});
            await warehouseModel.destroy({ where: {  id: req.params.id  }  });
            return res.status(400).send({ data :  "DELETED" });
        }catch(e){ 
            console.log(e);
            return res.status(500).send({ error :  "GENERAL ERROR", message : e.message, code : 402.20});
        }
    },
}
export default  controller;