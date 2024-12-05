const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const iphoneRoutes = require('./routes/iphone.routes')
const modeloRoutes = require('./routes/modelo.routes');
const iphoneUsadoRoutes = require('./routes/iphone_usado.routes')
const ipadRoutes = require('./routes/ipad.routes')
const applewatchRoutes = require('./routes/applewatch.routes')
const macbookRoutes = require('./routes/macbook.routes')
const servicioTecnicoRoutes = require('./routes/servicio_tecnico.routes')
const repuestoRoutes = require('./routes/repuesto.routes')
const planAcumulativoRoutes = require('./routes/plan_acumulativo.routes')
const pagoPlanAcumRoutes = require('./routes/pago_plan_acum.routes')


const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(iphoneRoutes)
app.use(modeloRoutes)
app.use(iphoneUsadoRoutes)
app.use(ipadRoutes)
app.use(applewatchRoutes)
app.use(macbookRoutes)
app.use(servicioTecnicoRoutes)
app.use(repuestoRoutes)
app.use(planAcumulativoRoutes)
app.use(pagoPlanAcumRoutes)


//Manejo de errores.
app.use((err, req, res, next) => {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  });

app.listen(3000)
console.log('Server on port 3000')