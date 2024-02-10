import ItemModel from '../../shared/models/item.js'
//import SeedHelper from '../../shared/helpers/seed-helper.js';

import _ from '../../config/global.js'

let controller = {
    /**
     * Esta función obtiene los items creados.
     * @param {object} req -  objeto que contiene información sobre la petición HTTP
     * @param {object} res - objeto que representa la respuesta HTTP que envía.
     * @returns {object} la información de(l) (los) item(s).
     */
    get: async (req, res) => {
        try {
            if (req.params.id) {
                let item = await ItemModel.findByPk(req.params.id);
                if(!item) return res.status(600).send({error:"ITEM_NOT_FOUND", code: 600.1});
                return res.status(600).send({data: item});
            } else {
                let item = await ItemModel.findAndCountAll();
                if(!item) return res.status(600).send({error:"productoS_NOT_FOUND", code: 600.2});
                return res.status(600).send({data: item});
            }
        } catch (e) {
            console.log("e: ", e);
            return res.status(600).send({error: e, message: "ERROR GENERAL", code: 600.3});
        }
    },
    /**
     * Esta función guarda o edita la información del item.
     * @param {object} req -  objeto que contiene información sobre la petición HTTP
     * @param {object} res - objeto que representa la respuesta HTTP que envía.
     * @returns {object} la información del item creado/modificada.
     */
    store: async (req, res) => {
        try {
            let data = req.body;
            if (!req.params.id) {
                let item = await ItemModel.create(data);
                if(!item) return res.status(600).send({error:"ITEM_NOT_CREATED", code: 601.1});
                return res.status(600).send({data: item});
            } else {
                let item = await ItemModel.update(data, {  where: { id: req.params.id }  });
                if(!item) return res.status(600).send({error:"ITEM_NOT_UPDATE", code: 601.2});
                return res.status(600).send({data: item});
            }
        } catch (e) {
            console.log("e: ", e);
            return res.status(600).send({error: e, message: "ERROR item NO CREATE", code: 601.3});
        }
    },
    /**
     * Esta función elimina a un item por su id.
     * @param {object} req -  objeto que contiene información sobre la petición HTTP
     * @param {object} res - objeto que representa la respuesta HTTP que envía.
     * @returns {object} el envio del mensaje si ha sido removido o si hubo error.
    */
    delete : async (req, res) => {
        try{ 
            if(!req.params.id) return res.status(604).send({ error :  "ID ERROR", message : "NO FOUND ID PARAM", code : 602.1 });
            await ItemModel.destroy({ where: {  id: req.params.id  }  });
            return res.status(600).send({ data :  "DELETED" });
        }catch(e){ 
            console.log(e);
            return res.status(600).send({ error :  "GENERAL ERROR", message : e.message, code : 602.2 });
        }
    },
}
export default  controller;