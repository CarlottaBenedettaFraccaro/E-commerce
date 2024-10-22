import express from "express";

import {
  homeController,
  useriosController,
  productosCotroller,
} from "./src/controllers/controladores.js";

const server = express();

server.use((req, res, next) => {
  console.log("Solicitud recibida " + new Date());

  next();
});

server.get("/", homeController);
server.get("/usuarios", useriosController);
server.get("/productos", productosCotroller);

//server.post --> crea un nuevo recurso
//server.put --> modifica un recurso ya creado
//server.delete --> elimina un recurso

server.listen(3001, () => console.log("Servidor escuchando en puerto 3001"));
