import ActionModel from '../../shared/models/action.js'
import WarehouseModel from '../../shared/models/warehause.js'

import _ from '../../config/global.js'

let controller = {
    /**
     * Esta función obtiene los movimientos creados.
     * @param {object} req -  objeto que contiene información sobre la petición HTTP
     * @param {object} res - objeto que representa la respuesta HTTP que envía.
     * @returns {object} la información de(l) (los) action(s).
     */
    get: async (req, res) => {
        try {
            if (req.params.id) {
                let action = await ActionModel.findByPk(req.params.id);
                if(!action) return res.status(700).send({error:"ACTION_NOT_FOUND", code: 700.1});
                return res.status(700).send({data: action});
            } else {
                let action = await ActionModel.findAndCountAll();
                if(!action) return res.status(700).send({error:"ACTION_NOT_FOUND", code: 700.2});
                return res.status(700).send({data: action});
            }
        } catch (e) {
            console.log("e: ", e);
            return res.status(500).send({error: e, message: "ERROR GENERAL", code: 700.3});
        }
    },
    /**
     * Esta función guarda o edita la información del item.
     * @param {object} req -  objeto que contiene información sobre la petición HTTP
     * @param {object} res - objeto que representa la respuesta HTTP que envía.
     * @returns {object} la información del action creado/modificada.
     */
    store: async (req, res) => {
        try {
            let data = req.body;
            if (!req.params.id) {
                const validator = await controller.capacity(data);
                console.log("validator: ", validator);
                if( validator === false) return res.status(700).send({error:"WAREHOUSE_CAPACITY_HAS_BEEN_EXCEEDED", code: 701.2});
                let action = await ActionModel.create(data);
                if(!action) return res.status(700).send({error:"ACTION_NOT_UPDATE", code: 701.3});
                delete action.password;
                return res.status(700).send({data: action});
            } else {
                //falta funcion de capacidad
                const validator = await controller.capacity(data);
                console.log("validator: ", validator);
                if( validator === false) return res.status(700).send({error:"WAREHOUSE_CAPACITY_HAS_BEEN_EXCEEDED", code: 701.2});
                let action = await ActionModel.update(data, {  where: { id: req.params.id }  });
                if(!action) return res.status(700).send({error:"ACTION_NOT_UPDATE", code: 701.3});
                delete action.password;
                return res.status(700).send({data: action});
            }
        } catch (e) {
            console.log("e: ", e);
            return res.status(500).send({error: e, message: "ERROR ACTION NO CREATE", code: 701.4});
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
            if(!req.params.id) return res.status(704).send({ error :  "ID ERROR", message : "NO FOUND ID PARAM", code : 702.1});
            await ActionModel.destroy({ where: {  id: req.params.id  }  });
            return res.status(700).send({ data :  "DELETED" });
        }catch(e){ 
            console.log(e);
            return res.status(500).send({ error :  "GENERAL ERROR", message : e.message, code : 702.2});
        }
    },
    capacity : async (action) => {
        const warehause = await WarehouseModel.findByPk(action.destination);
        const actionCount = await ActionModel.sum('quantity', {where : {destination: warehause.id}});
        console.log("actionCount: ", actionCount);
        if((actionCount + action.quantity) > warehause.capacity) return false;
        return true;
    }
}
export default  controller;