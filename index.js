const express = require('express');
const routerApi = require('./routes');
const cors = require('cors')
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app =  express();
const port = process.env.PORT || 3000;

app.use(express.json())
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
  res.send('Hola, soy una nueva ruta');
})

routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler)


app.listen(port, ()=>{
  console.log('Mi port ' + port);
});



