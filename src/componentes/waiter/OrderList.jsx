 import { useState, useEffect } from "react";
 import { httpGetOrder } from "../../helpers/api.js"
import { NavWaiter } from "./NavWaiter.jsx";

const ListOrders = ({token}) => {
  document.body.classList.add('others-background');
  document.body.classList.remove('login-background');
  const [order, setOrder] = useState([]);

    async  function readOrders(){
        setOrder( await httpGetOrder( localStorage.getItem("token")))
      }
    
      useEffect(() => {
        const read = async () => {
            await readOrders();
        };
        read();
      }, [])
return(
<>
<NavWaiter/>
<main className="ordersList-main">
  {order
    ?.sort((a, b) => new Date(b.dateEntry) - new Date(a.dateEntry))
    .map((orderlist) => (
      <div className="card" key={orderlist.id}>
        <h2>Tarjeta de Pedido</h2>
        <div className="info">
          <strong>Cliente:</strong> {orderlist.client}
        </div>
        <div className="info">
          <strong>Fecha y Hora:</strong> {orderlist.dateEntry}
        </div>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
            </tr>
          </thead>
          <tbody>
            {orderlist.products?.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.amount}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="total">Total del Pedido:</td>
              <td className="total">
                ${orderlist.products.reduce(
                  (acumulador, elemento) => acumulador + elemento.price,
                  0
                )}
              </td>
              <td>     {orderlist.status === "pending" ? (
                  <button className="wt-orders-table__submit-button">Cancelar</button>
                ) : (
                  <button className="wt-orders-table__submit-button">Entregar</button>
                )}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    ))}
</main>


</>

)}

 export default ListOrders;