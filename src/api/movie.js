import {deleteRequest, getRequest, postRequest} from '@/api/request';

const apiRoute = {
    queryAllMovies: '/movie',
    movieImage: '/images',
    movieVideo: '/videos',
    movieRating: '/rating',
    movieStaff: '/celebrities',
    movieReviews: '/review',
    searchMovie: '/search/movie',
};

export async function queryAllMovies(data) {
    return postRequest(apiRoute.queryAllMovies + '/', data);
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

export async function queryMovieReviews(data, id) {
    return getRequest(apiRoute.queryAllMovies + "/" + id + apiRoute.movieReviews + '/', data);
}

export async function queryMovieVideos(data, id) {
    return getRequest(apiRoute.queryAllMovies + "/" + id + apiRoute.movieVideo + '/', data);
}

export async function addReview(data, id) {
    /* localhost:8000/movie/1/review/ */
    return postRequest(apiRoute.queryAllMovies + "/" + id + "/review/", data);
}

export async function searchMovie(data) {
    return getRequest(apiRoute.searchMovie + '/' + '?query=' + data.query, data);
}

export async function queryMoviePositionStaff(data, id) {
    return getRequest(apiRoute.queryAllMovies + "/" + id + '/staffs/?position=' + data.position, '');
}

export async function submitMovieRating(data, id) {
    return postRequest(apiRoute.queryAllMovies + "/" + id + apiRoute.movieRating + '/', data);
}


