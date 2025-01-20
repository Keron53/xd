require("dotenv").config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const iphoneRoutes = require('./routes/iphone.routes')
const modeloRoutes = require('./routes/modelo.routes');
const iphoneUsadoRoutes = require('./routes/iphone_usado.routes')
const ipadRoutes = require('./routes/ipad.routes')
const applewatchRoutes = require('./routes/applewatch.routes')
const macbookRoutes = require('./routes/macbook.routes')
const authRoutes = require("./routes/auth.routes");



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
app.use(authRoutes);


//Manejo de errores.
app.use((err, req, res, next) => {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  });

app.listen(4000)
console.log('Server on port 4000')