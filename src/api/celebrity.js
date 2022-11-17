import { getRequest, postRequest } from '@/api/request';

const apiRoute = {
    queryAllCelebrities: '/celebrity',
    celebrityImage: '/images',
    celebrityMovies: '/movies',
    celebrityCooperation: '/celebrities',
};

export async function queryAllCelebrities(data) {
    return getRequest(apiRoute.queryAllCelebrities + '/?' + 'limit=' + data.limit + '&offset=' + data.offset, data);
}

export async function queryCelebrityDetail(data, id) {
    return getRequest(apiRoute.queryAllCelebrities + "/" + id + '/', data);
}

export async function queryCelebrityImages(data, id) {
    return getRequest(apiRoute.queryAllCelebrities + "/" + id + apiRoute.celebrityImage + '/', data);
}

export async function queryCelebrityMovies(data, id) {
    return getRequest(apiRoute.queryAllCelebrities + "/" + id + apiRoute.celebrityMovies + '/', data);
}

export async function queryCelebrityCooperation(data, id) {
    return getRequest(apiRoute.queryAllCelebrities + "/" + id + apiRoute.celebrityCooperation + '/', data);
}