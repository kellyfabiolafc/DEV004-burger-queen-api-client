import { NavChef } from "./NavChef.jsx";
import { useEffect , useState } from "react";
import { httpGetOrder } from "../../helpers/api.js"

const ListOrden = ({token}) => {
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
    return (
        <>
          <NavChef/>
          <main className="ordersList-main">
        {order
          ?.filter((orderlist) => orderlist.status === "delivered")
          .sort((a, b) => new Date(b.dateEntry) - new Date(a.dateEntry))
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
                  </tr>
                </thead>
                <tbody>
                  {orderlist.products?.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.amount}</td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </main>
        </>
      )
}

export default ListOrden;