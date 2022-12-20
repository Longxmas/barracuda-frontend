import {deleteRequest, getRequest, postRequest} from '@/api/request';

const apiRoute = {
    userRoot: '/user/',
    profile: '/info/',
    writtenReview: '/review/',
    jointGroup: '/groups/',
    starMovies: '/starmovies/',
    starCelebrities: '/starcelebrities/',
    updateProfile: '/updateinfo/'
};

/*
user/<int:user_id>/review/
user/<int:user_id>/info/
user/<int:user_id>/uploadavatar/
user/<int:user_id>/starmovies/
user/<int:user_id>/starcelebrities/
user/<int:user_id>/starmovie/<int:movie_id>/
user/<int:user_id>/starcelebrity/<int:celebrity_id>/
user/<int:user_id>/groups/
user/<int:user_id>/updateinfo/
 */

export async function getUserProfile(data, user_id) {
    return getRequest(apiRoute.userRoot + user_id +
        apiRoute.profile, data);
}

export async function getStarMovies(data, user_id) {
    return getRequest(apiRoute.userRoot + user_id +
        apiRoute.starMovies, data);
}

export async function getStarCelebrities(data, user_id) {
    return getRequest(apiRoute.userRoot + user_id +
        apiRoute.starCelebrities, data);
}

export async function getWrittenReviews(data, user_id) {
    return getRequest(apiRoute.userRoot + user_id +
        apiRoute.writtenReview, data);
}

export async function getJoinedGroups(data, user_id) {
    return getRequest(apiRoute.userRoot + user_id +
        apiRoute.jointGroup, data);
}

export async function updateProfile(data, user_id) {
    return postRequest(apiRoute.userRoot + user_id +
        apiRoute.updateProfile, data);
}

export async function starMovie(data, user_id, movie_id) {
    return postRequest(apiRoute.userRoot + user_id +
        apiRoute.starMovies + movie_id + '/', data);
}

export async function starCelebrity(data, user_id, celebrity_id) {
    return postRequest(apiRoute.userRoot + user_id +
        apiRoute.starCelebrities + celebrity_id + '/', data);
}

export async function unstarMovie(data, user_id, movie_id) {
    return deleteRequest(apiRoute.userRoot + user_id +
        apiRoute.starMovies + movie_id + '/', data);
}

export async function unstarCelebrity(data, user_id, celebrity_id) {
    return deleteRequest(apiRoute.userRoot + user_id +
        apiRoute.starCelebrities + celebrity_id + '/', data);
}

export async function uploadAvatar(data, user_id) {
    return postRequest(apiRoute.userRoot + user_id +
        '/uploadavatar/', data);
}