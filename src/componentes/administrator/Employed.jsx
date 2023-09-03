import { httpAddEmployed, httpGetEmployed } from '../../helpers/api'
import './Administrador.css'
import { useState, useEffect } from "react";
import { NavAdmin } from './NavAdmin';

const Administrador = ({ token }) => {
  
  document.body.classList.add("others-background");
  document.body.classList.remove("login-background");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [employees, setEmployed] = useState([]);

  async function saveEmployed(e) {
    // evita la recarga de la pagina - evita el comportamiento normal del evento
    e.preventDefault();
    // si alguno de los 3 datos no tiene valor no se permite continuar
    if (!email) return alert("You must enter your email")
    if (!password) return alert("You must enter a password")
    if (!role) return alert("You must select a role")
    const newUser = {
      "email": email,
      "password": password,
      "role": role
    }
    try {

      await httpAddEmployed(token, newUser);
      console.log("Se inserto al empleado con exito")
      //segun el rol se navegar

    } catch {
      console.log('No se pudo agregar al empleado');
    }

  }

  async function readEmployed() {
    setEmployed(await httpGetEmployed(localStorage.getItem("token")));
  }

  useEffect(() => {
    const read = async () => {
      await readEmployed();
    };
    read();
  },)


  return (
    <>
      <NavAdmin />
      <main className='adm-main-container'>
        <div>
        <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
          <h5>List Of Waiters </h5>

          <table className='table-list-of-employed'>
            <thead>
              <tr>
                <th className='table-th-td' id='table-th'>Employed</th>
                <th className='table-th-td' id='table-th'>Role</th>
                <th className='table-th-td' id='table-th'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((employed) => (
                <tr key={employed.id}>
                  <td className='table-th-td' id='table-td'>{employed.email}</td>
                  <td className='table-th-td' id='table-td'>{employed.role}</td>
                  <td className='table-th-td' id='table-td'>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <aside className="admin-form-container">
          <form action="" className="admin-form" onSubmit={(e) => saveEmployed(e)}>
            <h2><strong>Add New Waiter</strong></h2>
            <label htmlFor="">Email</label>
            <input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="">Password</label>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="">Role</label>
            <select name="" id="" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="" disabled="" selected="" >Select role:</option>
              <option value="admin">Administrador</option>
              <option value="chef">Chef</option>
              <option value="waiter">Waiter</option>
            </select>
            <button type="submit">Add Employed</button>
          </form>
        </aside>
      </main>
    </>
  )
}
export default Administrador;