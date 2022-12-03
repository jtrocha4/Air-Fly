const express = require('express')
const bodyParser = require("body-parser")
var cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const configuracion = require("./config/config")

//Modelos
require("./models/index")

//Servicios
const AvionService = require("./services/avion")
const avionsService = new AvionService();

const EmpleadoService = require("./services/empleado")
const empleadosService = new EmpleadoService();

const baseAereaService = require("./services/baseArea")
const baseAereasService = new baseAereaService();

const parametroService = require("./services/parametro")
const parametrosService = new parametroService();

//EndPoint

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  res.send('Consultaste por POST')
})

//Consulta de avion por id
app.get('/avion/:id', async (req, res) => {
  const result = await avionsService.getAvion(req.params.id)
  res.send(result)
})

//Consulta de todos los aviones
app.post('/avion/getAviones', async (req, res) => {
  const body = req.body
  const result = await avionsService.getAviones(body)
  res.send(result)
})

//Create de avion
app.post('/avion/', async (req, res) => {
  const body = req.body
  const result = await avionsService.createAvion(body)
  res.send(result)
})

//Update de avion
app.put('/avion/:id', async (req, res) => {
  const body = req.body
  const result = await avionsService.updateAvion(req.params.id, body)
  res.send(result)
})

//Delete de avion
app.delete('/avion/:id', async (req, res) => {
  const result = await avionsService.deleteAvion(req.params.id)
  res.send(result)
})


//Consulta de empleado por id
app.get('/empleado/:id', async (req, res) => {
  const result = await empleadosService.getEmpleado(req.params.id)
  res.send(result)
})

//Consulta de todos los empleado
app.post('/empleado/getEmpleados', async (req, res) => {
  const body = req.body
  const result = await empleadosService.getEmpleados(body)
  res.send(result)
})

//Create de empleado
app.post('/empleado/', async (req, res) => {
  const body = req.body
  const result = await empleadosService.createEmpleado(body)
  res.send(result)
})

//Update de empleado
app.put('/empleado/:id', async (req, res) => {
  const body = req.body
  const result = await empleadosService.updateEmpleado(req.params.id, body)
  res.send(result)
})

//Delete de avion
app.delete('/empleado/:id', async (req, res) => {
  const result = await empleadosService.deleteEmpleado(req.params.id)
  res.send(result)
})

//Consulta de bases areas por id
app.get('/baseAerea/:id', async (req, res) => {
  const avion = await baseAereasService.getBaseAerea(req.params.id)
  res.send(avion)
})

//Consultar todos las bases
app.post('/baseAerea/getBases', async (req, res) => {
  const body = req.body
  const result = await baseAereasService.getBasesAereas(body)
  res.send(result)
})

//Create de empleado
app.post('/baseAerea/', async (req, res) => {
  const body = req.body
  const result = await baseAereasService.CreateBase(body)
  res.send(result)
})

//Update de empleado
app.put('/baseAerea/:id', async (req, res) => {
  const body = req.body
  const result = await baseAereasService.updateBaseAerea(req.params.id, body)
  res.send(result)
})

//Delete de avion
app.delete('/baseAerea/:id', async (req, res) => {
  const result = await baseAereasService.deleteBaseaerea(req.params.id)
  res.send(result)
})


//Consulta de Parametro por id
app.get('/parametro/:id', async (req, res) => {
  const result = await parametrosService.getParametro(req.params.id)
  res.send(result)
})

//Consulta de todos los aviones
app.post('/parametro/getParametros', async (req, res) => {
  const body = req.body
  const result = await parametrosService.getParametros(body)
  res.send(result)
})

//Create de avion
app.post('/parametro/', async (req, res) => {
  const body = req.body
  const result = await parametrosService.createParametro(body)
  res.send(result)
})

//Update de avion
app.put('/parametro/:id', async (req, res) => {
  const body = req.body
  const result = await parametrosService.updateParametro(req.params.id, body)
  res.send(result)
})

//Delete de avion
app.delete('/parametro/:id', async (req, res) => {
  const result = await parametrosService.deleteParametro(req.params.id)
  res.send(result)
})

app.listen(configuracion.addPort, () => {
  console.log(`Example app listening on port http://localhost:${configuracion.addPort}/`)
})

