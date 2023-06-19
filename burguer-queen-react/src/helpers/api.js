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
    return "error";
  }
}

export async function httpAddEmployed(token, user) {
  try {
    const response = await axios.post(`${dominiolocal}/users`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return console.log(err);
  }
}

export async function httpGetEmployed(token) {
  try {
    const response = await axios.get(`${dominiolocal}/users`, {
      // autorization envio el token de autorizacion
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function httpGetProducts(token) {
  try {
    const response = await axios.get(`${dominiolocal}/products`, {
      headers: {
      
        'Authorization': `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch(err) {
    console.log(err)
  }
}

// export async function httpDeleteProducts(token) {
//   try {
//     const response = await axios.get(`${dominiolocal}/products`, {
//       headers: {
      
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     // console.log(response.data);
//     return response.data;
//   } catch(err) {
//     console.log(err)
//   }
// }


export async function httpCreateOrder(token, product){
  try {
    const response = await axios.post(`${dominiolocal}/orders`, product, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data
  }catch(err) {
    console.log(err);
  }
}

export async function httpGetOrder(token){
  try {
    const response = await axios.get(`${dominiolocal}/orders`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data
  }catch(err) {
    console.log(err);
  }
}

