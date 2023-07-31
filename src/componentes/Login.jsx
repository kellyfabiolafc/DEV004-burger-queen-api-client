import logoBurger from "../assets/banner.png";
import { useState, useEffect } from "react";
 import { useNavigate } from "react-router-dom";
import { httpLogin } from "../helpers/api";

// Componente de inicio de sesión
const Login = ({ updateToken }) => {

  // Añadir clase CSS al cuerpo del documento para el estilo de fondo del inicio de sesión
  document.body.classList.add('login-background');
  document.body.classList.remove('others-background');

  // Para navegar a rutas
  const navigate = useNavigate();

  // Guardar la entrada del usuario y contraseña
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [textWrong, settextWrong] = useState(true);

  // Función para manejar el evento de inicio de sesión
  const loginClick = async (evt) => {
    evt.preventDefault();
    try {
      // Realizar la solicitud de inicio de sesión
      const data = await httpLogin(user, password);

      // Guardar el token en el almacenamiento local
      localStorage.setItem("token", data.accessToken);

      // Actualizar el token en el estado
      updateToken(data.accessToken);

      // Según el rol del usuario, se navegará a la página correspondiente
      if (data.user.role === 'admin') return navigate('/administrador/employed');
      if (data.user.role === 'chef') return navigate('/chef');
      if (data.user.role === 'waiter') return navigate('/waiter/orders');

    } catch {
      // Si ocurre un error durante el inicio de sesión
      settextWrong(false);
      console.log('No se encontraron roles asociados a su cuenta');
    }
  };

  // Efecto para actualizar el token
  useEffect(() => updateToken(""), []);


  return (
    <>
      <main className="lg-main-conteiner">
        <div className="lg-logo">
          <img
            src={logoBurger}
            className="lg-logo-img"
            alt="Logo Burger Queen"
          />
        </div>
        <div className="lg-form-container">
          <form action="" className="lg-form" onSubmit={(evt)=>{ loginClick(evt)}}>
    
            <p>Welcome</p>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="example@gmail.com" 
            value={user} 
            onChange={(e) => setUser(e.target.value)}/>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            />
             {textWrong === false && <span  style={{ color: "red" }}>verify email and password</span>}
            <button type="submit">Login</button>
      
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
