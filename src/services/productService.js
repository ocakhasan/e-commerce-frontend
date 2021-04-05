import axios from 'axios'

const baseUrl = "/api/product"

const getAllProduct = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getProduct = async (id) => {
    const url = `${baseUrl}/${id}`
    const response = await axios.get(url)
    return response.data
}

export default { getAllProduct, getProduct }