const { httpLogin } = require("../src/helpers/api.js")
// import {
//     httpLogin,
//     // httpAddEmployed,
//     // httpGetEmployed,
//     // httpGetProducts,
//     // httpUpdateOrders,
//     // httpCreateOrder,
//     // httpGetOrder
// } from "../src/helpers/api.js"
import axios from 'axios';
// const axios = require('axios') ;

jest.mock('axios'); // mokear el modulo de axios.
axios.post.mockResolvedValue({ data: "respuesta exitosa" })

describe("httpLogin", () => {

    it("deberia devolver una respuesta del servidor si la solicitud ha sido  exitosa", async () => {
        const user = 'fabiola@gmail.com'
        const password = '123456'
        const dominiolocal = '';

        const respuesta = await httpLogin(user, password);
        expect(respuesta).toBe('respuesta exitosa');
        expect(axios.post).toHaveBeenCalledWith(
            `${dominiolocal}/login`,
            { email: user, password: password },
            { headers: { 'Content-Type': 'application/json' } }
        );
    });
})



