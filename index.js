import server from "./src/server.js";

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
