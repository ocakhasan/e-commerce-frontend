import axios from 'axios'

let token = null

const setToken = newToken => {
    token = newToken
}

const addProductCard = async (id) => {
    const url = `/api/cart/${id}`
    const bodyToSend = {token}
    const response = await axios.post(url, bodyToSend)
    return response.data
}

const cartService = { addProductCard, setToken }

export default cartService