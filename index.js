import  db from './shared/connectors/db.js';
import app from './shared/app.js';
import _ from './config/global.js';
//import('./shared/models/asociations.js');

db.sync({ force:   false }).then(() => {
    console.log("DB_CONNECT");
    app.listen(_.PORT,() => {
        console.log("LOAD_SERVER PORT" , _.PORT);
    });
}).catch((err) => { console.log(err) });