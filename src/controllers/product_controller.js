import ProductModel from '../../shared/models/product.js'
//import SeedHelper from '../../shared/helpers/seed-helper.js';

import _ from '../../config/global.js'

let controller = {
    /**
     * Esta función obtiene los productos creados.
     * @param {object} req -  objeto que contiene información sobre la petición HTTP
     * @param {object} res - objeto que representa la respuesta HTTP que envía.
     * @returns {object} la información de(l) (los) producto(s).
     */
    get: async (req, res) => {
        try {
            if (req.params.id) {
                let product = await ProductModel.findByPk(req.params.id);
                if(!product) return res.status(400).send({error:"PRODUCT_NOT_FOUND", code: 300.1});
                return res.status(300).send({data: product});
            } else {
                let productos = await ProductModel.findAndCountAll();
                if(!productos) return res.status(400).send({error:"productoS_NOT_FOUND", code: 300.2});
                return res.status(300).send({data: productos});
            }
        } catch (e) {
            console.log("e: ", e);
            return res.status(500).send({error: e, message: "ERROR GENERAL", code: 300.3});
        }
    },
    /**
     * Esta función guarda o edita la información del producto.
     * @param {object} req -  objeto que contiene información sobre la petición HTTP
     * @param {object} res - objeto que representa la respuesta HTTP que envía.
     * @returns {object} la información del producto creado/modificada.
     */
    store: async (req, res) => {
        try {
            let data = req.body;
            if (!req.params.id) {
                let product = await ProductModel.create(data);
                if(!product) return res.status(400).send({error:"PRODUCT_NOT_CREATED", code: 301.1});
                return res.status(300).send({data: product});
            } else {

                let product = await ProductModel.update(data, {  where: { id: req.params.id }  });
                if(!product) return res.status(400).send({error:"PRODUCT_NOT_UPDATE", code: 301.2});
                return res.status(300).send({data: product});
            }
        } catch (e) {
            console.log("e: ", e);
            return res.status(500).send({error: e, message: "ERROR product NO CREATE", code: 301.3});
        }
    },
    /**
     * Esta función elimina a un producto por su id.
     * @param {object} req -  objeto que contiene información sobre la petición HTTP
     * @param {object} res - objeto que representa la respuesta HTTP que envía.
     * @returns {object} el envio del mensaje si ha sido removido o si hubo error.
    */
    delete : async (req, res) => {
        try{ 
            if(!req.params.id) return res.status(404).send({ error :  "ID ERROR", message : "NO FOUND ID PARAM", code : 303.1 });
            await ProductModel.destroy({ where: {  id: req.params.id  }  });
            return res.status(300).send({ data :  "DELETED" });
        }catch(e){ 
            console.log(e);
            return res.status(500).send({ error :  "GENERAL ERROR", message : e.message, code : 303.2 });
        }
    },
}
export default  controller;