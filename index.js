import express from "express";

import {
  homeController,
  usersController,
  productsCotroller,
} from "./src/controllers/controladores.js";
//creamos una instancia de express
const server = express();

//middleware de aplicación
//son funciones que se aplican a todas las rutas
server.use((req, res, next) => {
  console.log("Solicitud recibida " + new Date());

  next();
});

server.get("/", homeController);
server.get("/users", usersController);
server.get("/products", productsCotroller);

//server.post --> crea un nuevo recurso
//server.put --> modifica un recurso ya creado
//server.delete --> elimina un recurso

server.listen(3001, () => console.log("Servidor escuchando en puerto 3001"));
