import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useState, useEffect } from "react";
import { db } from "./data/db";

function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("carrito");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [carrito, setCarrito] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  function addToCar(item) {
    const itemExist = carrito.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      console.log("Ese elemento ya existe.");
      const updateCarrito = [...carrito];
      updateCarrito[itemExist].quantity++;
      setCarrito(updateCarrito);
    } else {
      console.log("No existe... agregando al carrito...");
      item.quantity = 1;
      setCarrito([...carrito, item]);
    }
  }

  function removeFromCart(id) {
    console.log("Eliminando", id);
    setCarrito((prepCart) => prepCart.filter((guitar) => guitar.id !== id));
  }

  function incrementarGuitarra(id) {
    console.log("Incrementando", id);
    const updateCart = carrito.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCarrito(updateCart);
  }

  function decrementarGuitarra(id) {
    console.log("Decrementando", id);
    const updateCart = carrito.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCarrito(updateCart);
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  return (
    <>
      <Header
        carrito={carrito}
        removeFromCart={removeFromCart}
        incrementarGuitarra={incrementarGuitarra}
        decrementarGuitarra={decrementarGuitarra}
        vaciarCarrito={vaciarCarrito}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCar={addToCar} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
