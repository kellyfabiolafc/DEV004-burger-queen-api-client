import { NavWaiter } from "./NavWaiter.jsx";
import { useState, useEffect } from "react";
import {
  httpGetProducts,
  httpCreateOrder,
  httpGetOrder,
} from "../../helpers/api.js";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faMugSaucer, faUtensils, faPlus, faMinus, faTrash} from '@fortawesome/free-solid-svg-icons'

const Waiter = ({ token }) => {
  document.body.classList.add('others-background');
  document.body.classList.remove('login-background');
  const [customer, setCustomer] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  // const [productsOrder, setProductsOrder] = useState([])
  const [products, setProducts] = useState([]);
  // const [card, setCard]= useState()
  async function readProducts() {
    setProducts(await httpGetProducts(localStorage.getItem("token")));
  }

  useEffect(() => {
    const read = async () => {
      await readProducts();
    };
    read();
  });

  async function saveOrder(e) {
    // evita la recarga de la pagina - evita el comportamiento normal del evento
    e.preventDefault();
    // si alguno de los 3 datos no tiene valor no se permite continuar
    if (!customer) return alert("You must enter name of custumer");

    const dateEntry = DateTime.now().toISO();
    console.log(dateEntry);

    const newOrder = {
      client: customer,
      products: selectedProducts,
      status: "pending",
      dateEntry: dateEntry,
    };
    try {
      const result = await httpCreateOrder(token, newOrder);
      const resultado = await httpGetOrder(token);
      console.log(result);
      console.log(resultado);
      // await httpGetOrden
      setSelectedProducts([]);
      setCustomer("");
      console.log("Se agrego la orden con exito");
    } catch (err) {
      console.log("este es un error: " + err);
      console.log("No se agrego la orden con exito");
    }
  }

  const addProductToOrder = (product) => {
    //busca el indice del producto existente en el pedido
    const existToProducts = selectedProducts.findIndex(
      (selectedProduct) => selectedProduct.id === product.id
    );
    if (existToProducts !== -1) {
      //El producto ya esta en el pedido y es diferente a -1, entonces se incrementa la cantidad
      const updatedProducts = [...selectedProducts];
      updatedProducts[existToProducts].amount += 1;
      updatedProducts[existToProducts].price += product.price;
      //actualiza la lista de productos seleccionados
      setSelectedProducts(updatedProducts);
    } else {
      //agrega un nuevo producto al pedido
      setSelectedProducts((prevProducts) => [
        ...prevProducts,
        { ...product, amount: 1 },
      ]);
    }
  };

  const decrementProduct = (product) => {
    if (product.amount > 1) {
      // El producto ya está en el pedido y su cantidad es mayor que 1, entonces se disminuye la cantidad
      const updatedProducts = selectedProducts.map((selectedProduct) => {
        if (selectedProduct.id === product.id) {
          const updatedAmount = selectedProduct.amount - 1;
          const updatedPrice = selectedProduct.price - selectedProduct.price / selectedProduct.amount;
          return {
            ...selectedProduct,
            amount: updatedAmount,
            price: updatedPrice,
          };
        }
        return selectedProduct;
      });
      // Actualiza la lista de productos seleccionados
      setSelectedProducts(updatedProducts);
    } else {
      // Si la cantidad es igual o menor que 1, puedes decidir qué hacer aquí, como eliminar el producto del pedido o mostrar un mensaje de error.
      alert('La cantidad mínima del producto es 1');
    }
  };
  
  const increaseProduct = (product) => {
    if (product.amount >= 1 ) {
      // El producto ya está en el pedido y su cantidad es mayor que 1, entonces se disminuye la cantidad
      const updatedProducts = selectedProducts.map((selectedProduct) => {
        if (selectedProduct.id === product.id) {
          const updatedAmount = selectedProduct.amount + 1;
          const updatedPrice = selectedProduct.price + selectedProduct.price / selectedProduct.amount;
          return {
            ...selectedProduct,
            amount: updatedAmount,
            price: updatedPrice,
          };
        }
        return selectedProduct;
      });
      // Actualiza la lista de productos seleccionados
      setSelectedProducts(updatedProducts);
    } else {
      // Si la cantidad es igual o menor que 1, puedes decidir qué hacer aquí, como eliminar el producto del pedido o mostrar un mensaje de error.
      alert('La cantidad mínima del producto es 1');
    }
  };
  //fUNCION para eliminar un producto y actualizar la lista solo 
  const deleteProduct = (product) => {
    const updatedProducts = selectedProducts.filter((selectedProduct) => {
      return selectedProduct.id !== product.id;
    });
  
    setSelectedProducts(updatedProducts);
  };
  //funcion para sumar todas las cantidades de productos seleccionados 

  return (
    <>
      <NavWaiter />
      <main className="wt-main-container">
        <section className="wt-products-section">
          <div className="wt-products_section__buttons">
            <button className="wt-products-section__button"><FontAwesomeIcon icon={faMugSaucer} style={{color: "#e1d76b",}} /> Breakfast</button>
            <button className="wt-products-section__button">
            <FontAwesomeIcon icon={faUtensils} style={{color: "#e1d76b",}} /> Lunch & Dinner
            </button>
          </div>
          <div className="wt-products-section__content">
            {products?.map((product) => (
              <main
                key={product.id}
                className="card-of-product"
                onClick={() => addProductToOrder(product)}
              >
                <div className="card-img">
                  <img src={product.image} alt={`Product ${product.name}`} />
                </div>
                <div className="card-body">
                  <h4 className="card-title">{product.name}</h4>
                  <h6 className="card-text">{product.price}</h6>
                </div>
              </main>
            ))}
          </div>
        </section>

        <section className="wt-order-section">
          <form className="wt-orders-table" onSubmit={(e) => saveOrder(e)}>
            <div className="wt-orders-table__header-container">
              <label htmlFor="" className="wt-orders-table__label">
                Customer
              </label>
              <input
                type="text"
                name=""
                id=""
                className="wt-orders-table__input"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              />
            </div>
            <div className="wt-orders-table__table-container">
              <table className="wt-orders-table__table">
                <div className="wt-orders-table__thead-container">
                  <thead>
                    <tr className="wt-orders-table__row">
                      <th className="wt-orders-table__heading">Product</th>
                      <th className="wt-orders-table__heading">Price</th>
                      <th className="wt-orders-table__heading">Amount</th>
                      <th className="wt-orders-table__heading">Actions</th>
                    </tr>
                  </thead>
                </div>
                <div className=".wt-orders-table__tbody">
                  <tbody>
                    {selectedProducts.map((product, index) => (
                      <tr className="wt-orders-table__row" key={index}>
                        <td className="wt-orders-table__cell">
                          <img
                            src={product.image}
                            alt={`Product ${product.name}`}
                            className="wt-orders-table__image"
                          />
                        </td>
                        <td className="wt-orders-table__cell">
                          <h5 className="wt-orders-table__price">
                            {product.price}
                          </h5>
                        </td>
                        <td className="wt-orders-table__cell">
                          {product.amount}
                        </td>
                        <td className="wt-orders-table__cell">
                          <button type="button" className="wt-orders-table__button buttonDecrement" onClick={() => decrementProduct(product)}>
                          <FontAwesomeIcon icon={faMinus} size="sm" style={{color: "#5d6979",}} /> 
                          </button>
                          <button type="button" className="wt-orders-table__button buttonIncrease" onClick={() => increaseProduct(product)}>
                            <FontAwesomeIcon icon={faPlus} size="sm" style={{color: "#5d6979",}} />
                          </button>
                          <button type="button"  className="wt-orders-table__button buttonCancel" onClick={() => deleteProduct(product)}>
                          <FontAwesomeIcon icon={faTrash} size="sm" style={{color: "#767676",}} /> 
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </div>
              </table>
            </div>
            <p className="wt-orders-table__total" >total: {selectedProducts.reduce((acumulador, elemento) => acumulador +  elemento.price, 0)}</p>
            <button type="submit" className="wt-orders-table__submit-button">
            <FontAwesomeIcon icon={faPaperPlane} beat style={{color: "#e1d76b",}} /> Send the order
            </button>
          </form>
        </section>
      </main>
    </>
  );
};
export default Waiter;
