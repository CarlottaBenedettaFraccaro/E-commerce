import db from "../"; // tengo que poner la correcta, pripero hay que hacer un pull

export const getCartProductos = (req, res) => {
  const query = "SELECT * FROM cart"; // Cambia la tabla según tu diseño
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error, no de ha podido agregar:", err);
      return res.status(500).json({ message: "Error al obtener productos" });
    }
    res.json(results);
  });
};

export const addProductoToCart = (req, res) => {
  const { productoId, cantidad } = req.body; // repasar tabla de la DB
  const query = "INSERT INTO cart (productoId, cantidad) VALUES (?, ?)";
  db.query(query, [productoId, cantidad], (err, result) => {
    if (err) {
      console.error("Error al añadir al cart:", err);
      return res.status(500).json({ message: "Error al añadir producto" });
    }
    res.status(201).json({ id: result.insertId, productoId, cantidad });
  });
};

export const updateProductoIncart = (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
  const query = "UPDATE cart SET cantidad = ? WHERE id = ?";
  db.query(query, [cantidad, id], (err) => {
    if (err) {
      console.error("Error al actualizar producto en el cart:", err);
      return res.status(500).json({ message: "Error al actualizar producto" });
    }
    res.json({ message: "Producto actualizado correctamente" });
  });
};

export const deleteProductoFromcart = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM cart WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error al eliminar producto del cart:", err);
      return res.status(500).json({ message: "Error al eliminar producto" });
    }
    res.json({ message: "Producto eliminado correctamente" });
  });
};
