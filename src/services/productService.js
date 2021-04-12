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

const addProduct = async values => {
    const response = await axios.post(baseUrl, values)
    return response.data
}

const deleteProduct = async id => {
    const path = `${baseUrl}/${id}`
    const response = await axios.delete(path, { id })
    return response.data
}

const updateProduct = async productObject => {
    const url = "/api/update/product"
    const response = await axios.delete(url, productObject)
    return response.data
}

const productService = { getAllProduct, getProduct, addProduct, deleteProduct, updateProduct }
export default productService