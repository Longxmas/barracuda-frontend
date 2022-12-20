import {deleteRequest, getRequest, postRequest} from '@/api/request';

const apiRoute = {
    queryAllCelebrities: '/celebrity',
    celebrityImage: '/images',
    celebrityMovies: '/movies',
    celebrityCooperation: '/celebrities',
    searchActor: '/search/celebrity',
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

export async function searchActor(data) {
    return getRequest(apiRoute.searchActor + '/' + '?query=' + data.query, data);
}

export async function starActor(data, user_id, actor_id) {
    return postRequest('/user/' + user_id + '/starcelebrity/' + actor_id + '/', data);
}

export async function unstarActor(data, user_id, actor_id) {
    return deleteRequest('/user/' + user_id + '/starcelebrity/' + actor_id + '/', data);
}
