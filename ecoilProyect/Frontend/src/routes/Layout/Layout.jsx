import { Link, Outlet } from "react-router-dom";
import { useUser } from "../../UserContext";

// NOTAS ABAJO

function Layout() {
  const [user] = useUser();
  return (
    <>
      <header>
        <Link to="/">
          <h1>Home</h1>
        </Link>
        {user ? (
          <span>{user.username}</span>
        ) : (
          <Link to="/login">Iniciar sesión</Link>
        )}
      </header>
      <Outlet />
    </>
  );
}

export default Layout;

// el Layout parece que es algo que se puede mantener igual independientemente del proyecto, pero quisiera que le diéramos una vuelta.
