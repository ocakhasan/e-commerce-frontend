import axios from 'axios'

const getToken = () => {
    const logged = window.localStorage.getItem('logged')
    return JSON.parse(logged).token
}

const createOrder = async (address) => {
    let token = getToken()
    let body = {
        address,
        token
    }
    const url = "/api/order"

    const response = await axios.post(url, body)
    return response.data
}

const orderService = { createOrder }

export default orderService