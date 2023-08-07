import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import Swal from "sweetalert2";

const CartContainer = () => {
  const { cart, clearCart, deleteById, getTotalPrice } =
    useContext(CartContext);

  let total = getTotalPrice();

  const limpiar = () => {
    Swal.fire({
      title: "¿Esta seguro que quiere vaciar el carrito?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      // Si es Si o SI es No en el boton
      if (result.isConfirmed) {
        clearCart();
        Swal.fire("Carrito limpiado exitosamente", "", "success");
      } else if (result.isDenied) {
        Swal.fire("El carrito queda como estaba", "", "info");
      }
    });
  };

  return (
    <div>
      <h1>Carritoooo</h1>

      {cart.map((elemento) => {
        return (
          <div key={elemento.id} style={{ border: "2px solid black" }}>
            <h4>{elemento.title}</h4>
            <h5>{elemento.price}</h5>
            <h5>{elemento.quantity}</h5>
            <button onClick={() => deleteById(elemento.id)}>
              Eliminar producto
            </button>
          </div>
        );
      })}

      {cart.length > 0 && (
        <button onClick={limpiar}>Vaciar carrito de compras</button>
      )}

      <h2>El total es: {total}</h2>
    </div>
  );
};

export default CartContainer;