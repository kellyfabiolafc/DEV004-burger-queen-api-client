import Chef from "./componentes/chef/Chef.jsx";
import Waiter from "./componentes/waiter/Waiter.jsx";
import Administrador from "./componentes/administrator/Employed.jsx";
import Login from "./componentes/Login.jsx";
import ListOrden from "./componentes/chef/ListsOrder.jsx";
import ListOrders from "./componentes/waiter/OrderList.jsx";
import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import './App.css';
// Función principal del componente App
function App() {
  const [token, setToken] = useState('');
  // Estado para almacenar el token

  // Función de callback que actualiza el token cuando alguien ingresa al sistema
  const updateToken = (miToken) => setToken(miToken);

  return (
    <Router>
      {/* Configuración de las rutas */}
      <Routes>
        {/* Ruta para la página de inicio de sesión */}
        <Route path="/" element={<Login updateToken={updateToken}/>} />

        {/* Ruta para la página de órdenes del mesero */}
        <Route path="/waiter/orders" element={<Waiter token={token} />} />

        {/* Ruta para la página del chef */}
        <Route path="/chef" element={<Chef token={token}/>} />

        {/* Ruta para la página de empleados del administrador */}
        <Route path="/administrador/employed" element={<Administrador token={token} />} />

        {/* Ruta para la página de lista de órdenes del mesero */}
        <Route path="/waiter/orders/list" element={<ListOrders  token={token} />} />

        {/* Ruta para la página de lista de órdenes del chef */}
        <Route path="/chef/orders/list" element={<ListOrden token={token}/>} />
      </Routes>
    </Router>
  );
}


export default App;
