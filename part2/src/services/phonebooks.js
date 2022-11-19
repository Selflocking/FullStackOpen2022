import axios from "axios";

const serverUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios
        .get(serverUrl)
        .then(res => res.data)
}

const create = (newObject) => {
    return axios
        .post(serverUrl, newObject)
        .then(res => res.data)
}

const remove = (id) => {
    return axios
        .delete(`${serverUrl}/${id}`)
}

const change = (id, person) => {
    return axios
        .put(`${serverUrl}/${id}`, person)
}

// eslint-disable-next-line
export default {
    getAll,
    create,
    remove,
    change
}