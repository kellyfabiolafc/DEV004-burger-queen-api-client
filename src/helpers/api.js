import axios from "axios";
const dominiolocal = "http://localhost:8080";
// const dominio = 'https://burger-queen-api-mock-production-7906.up.railway.app'

export async function httpLogin(usuario, contrasena) {
  try {
    const response = await axios.post(
      `${dominiolocal}/login`,
      // cuerpo: body de la peticion post, lo que yo envio al servidor
      {
        email: usuario,
        password: contrasena,
      },
      {
        // cabecera: indico el tipo de dato que envio en este caso un json
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // devuelvo la data si todo va bien
    return response.data;
  } catch (error) {
    return console.log(error);
  }
}
// Función para agregar un empleado mediante una solicitud HTTP POST
export async function httpAddEmployed(token, user) {
  try {
    const response = await axios.post(`${dominiolocal}/users`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve los datos de la respuesta HTTP
  } catch (err) {
    return console.log(err); // Manejo de errores: Imprimir el error en la consola
  }
}

// Función para obtener información de empleados mediante una solicitud HTTP GET
export async function httpGetEmployed(token) {
  try {
    const response = await axios.get(`${dominiolocal}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve los datos de la respuesta HTTP
  } catch (err) {
    console.log(err); // Manejo de errores: Imprimir el error en la consola
  }
}

// Función para obtener información de productos mediante una solicitud HTTP GET
export async function httpGetProducts(token) {
  try {
    const response = await axios.get(`${dominiolocal}/products`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response.data; // Devuelve los datos de la respuesta HTTP
  } catch(err) {
    console.log(err); // Manejo de errores: Imprimir el error en la consola
  }
}

export async function httpCreateOrder(token, product){
  try {
    // Realiza una solicitud HTTP POST para crear una orden
    const response = await axios.post(`${dominiolocal}/orders`, product, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    // Devuelve los datos de la respuesta
    return response.data;
  } catch(err) {
    // Si ocurre un error, se muestra en la consola
    console.log(err);
  }
}

export async function httpGetOrder(token){
  try {
    // Realiza una solicitud HTTP GET para obtener una orden
    const response = await axios.get(`${dominiolocal}/orders`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    // Devuelve los datos de la respuesta
    return response.data;
  } catch(err) {
    // Si ocurre un error, se muestra en la consola
    console.log(err);
  }
}


// export async function httpUpdateOrders(token, ordersid) {
//   try {
//     // Realiza una solicitud HTTP DELETE para actualizar una orden
//     const response = await axios.delete(`${dominiolocal}/orders`, ordersid, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     // Devuelve los datos de la respuesta
//     return response.data;
//   } catch(err) {
//     // Si ocurre un error, se muestra en la consola
//     console.log(err);
//   }
// }
