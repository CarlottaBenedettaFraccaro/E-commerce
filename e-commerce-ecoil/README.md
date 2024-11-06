roRama01

- he creado el proyecto React-Vite con el código npm create vite e-commerce-ecoil
- a continuación he instalado los siguientes paquetes:

  - npm i react-router, proporciona todas las funciones básicas tanto para react-router-dom como para react-router-native. Al usarlo nunca deberemos importar nada directamente desde el paquete react-router. Ambos paquetes reexportan todo desde react-router.
  - npm i react-error-boundary, para ayudarnos a solventar posibles errores
  - npm i suspend-react Esta biblioteca integra sus operaciones asincrónicas en React Suspense. Los estados pendientes y de error se manejan en el nivel principal, lo que libera al componente individual de esa carga y permite una mejor orquestación.
  - npm i cors, para proveer un middleware de Express en React.

  \*al contar con la estructura npm i, hhe hecho la instalación de todos los componentes en una única línea\*

- he incluido un .env, para las variables de entorno, que he marcado dentro del .gitignore, y un .env_example donde podremos compartir no lo esencialmente sensible
