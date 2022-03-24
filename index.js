const express = require('express');
const routerApi = require('./routes');
const cors = require('cors')
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');
const fs = require('fs');
// npm run start => para levantar la instancia de heroku
// heroku ps:stop <nombre de la instancia> #web.1 por ejemplo

const app =  express();
const port = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded())
// Con el codigo comentado se puede elegir los dominios que
// si pueden hacerle peticiones a nuestra API
// const whitelist = ['http://localhost:8080']
// const options = {
//     origin: (origin, callback)=>{
//         if(whitelist.includes(origin) || !origin){
//             callback(null, true)
//         }else{
//             callback(new Error('No permitido'));
//         }
//     }
// }
// app.use(cors(options));
app.use(cors());

app.get('/',(req, res)=>{

  res.send('Hola mi server en express');
})

app.get('/nueva-ruta', (req, res)=>{


    fs.readFile('./data/users.json', 'utf8', (error, data) => {
        if(error){
            console.log(error);
            return;
        }
        console.log(JSON.parse(data));

    })
  res.send('Hola, soy una nueva ruta');
})

routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler)


app.listen(port, ()=>{
  console.log('Mi port ' + port);
});



