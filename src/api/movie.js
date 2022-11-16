import { getRequest, postRequest } from '@/api/request';

const apiRoute = {
    queryAllMovies: '/movie',
    movieImage: '/images',
    movieVideo: '/videos',
    movieRating: '/rating',
    movieStaff: '/celebrities',
    movieComments: '/comments',
};

export async function queryAllMovies(data) {
    return getRequest(apiRoute.queryAllMovies + '/', data);
}

export async function queryMovieDetail(data, id) {
    console.log(id);
    return getRequest(apiRoute.queryAllMovies + "/" + id + '/', data);
}

export async function queryMovieImages(data, id) {
    return getRequest(apiRoute.queryAllMovies + "/" + id + apiRoute.movieImage + '/', data);
}

export async function queryMovieRatings(data, id) {
    return getRequest(apiRoute.queryAllMovies + "/" + id + apiRoute.movieRating + '/', data);
}

export async function queryMovieStaff(data, id) {
    return getRequest(apiRoute.queryAllMovies + "/" + id + apiRoute.movieStaff + '/', data);
}

export async function queryMovieComments(data, id) {
    return getRequest(apiRoute.queryAllMovies + "/" + id + apiRoute.movieComments + '/', data);
}

export async function queryMovieVideos(data, id) {
    return getRequest(apiRoute.queryAllMovies + "/" + id + apiRoute.movieVideo + '/', data);
}