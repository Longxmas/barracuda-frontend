import {getRequest, postRequest, deleteRequest} from '@/api/request';

const apiRoute = {
    queryAllReviews: '/review',

};

export async function queryReviewDetail(data, id) {
    return getRequest(apiRoute.queryAllReviews + "/" + id + '/', data);
}

export async function queryReviewReply(data, id) {
    return getRequest(apiRoute.queryAllReviews + "/" + id + '/reply/', data);
}

export async function queryReviewLike(data, id) {
    //review/review_id/current_like/
    return getRequest(apiRoute.queryAllReviews + "/" + id + '/current_like/', data);
}

export async function addReviewLike(data, id) {
    return postRequest(apiRoute.queryAllReviews + "/" + id + '/like/', data);
}

export async function cancelReviewLike(data, id) {
    return deleteRequest(apiRoute.queryAllReviews + "/" + id + '/like/', data);
}

export async function submitReviewReply(data, id) {
    return postRequest(apiRoute.queryAllReviews + "/" + id + '/reply/', data);
}

export async function queryRandomReview(data) {
    return getRequest(apiRoute.queryAllReviews + "/random/", data);
}

export async function queryLatestReview(data) {
    return getRequest(apiRoute.queryAllReviews + "/latest/", data);
}