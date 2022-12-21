import axios from 'axios';

// axios.defaults.baseURL="http://localhost:8080";

export const apiUrl = 'http://localhost:8080/api/';

export async function getRequest(url, params) {
    try {
        return await axios(url, {
            method: 'get',
            params: params
        });
    } catch (error) {
        console.log(error)
    }
}

export async function postRequest(url, data) {
    try {
        return await axios(url, {
            method: 'post',
            data: data
        });
    } catch (error) {
        console.log(error)
    }
}

export async function deleteRequest(url, data) {
    try {
        return await axios(url, {
            method: 'delete',
            data: data
        });
    } catch (error) {
        console.log(error)
    }
}
