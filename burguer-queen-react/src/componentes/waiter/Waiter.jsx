import { NavWaiter } from "./NavWaiter.jsx";
import { useState, useEffect } from "react";
import {
  httpGetProducts,
  httpCreateOrder,
  httpGetOrder,
} from "../../helpers/api.js";
import { DateTime } from "luxon";

const Waiter = ({ token }) => {
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
    setSelectedProducts((prevProducts) => [...prevProducts, product]);
  };
  return (
    <>
      <NavWaiter />
      <main className="wt-main-container">
        <section className="wt-products-section">
          <div className="wt-products_section__buttons">
            <button className="wt-products-section__button">Breakfast</button>
            <button className="wt-products-section__button">
              Lunch & Dinner
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
                        <td className="wt-orders-table__cell">1</td>
                        <td className="wt-orders-table__cell">
                          <button className="wt-orders-table__button">
                            less
                          </button>
                          <button className="wt-orders-table__button">
                            more
                          </button>
                          <button className="wt-orders-table__button">
                            cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </div>
              </table>
            </div>
            <p className="wt-orders-table__total">total:</p>
            <button type="submit" className="wt-orders-table__submit-button">
              Send the order
            </button>
          </form>
        </section>
      </main>
    </>
  );
};
export default Waiter;
