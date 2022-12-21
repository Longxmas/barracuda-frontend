import {deleteRequest, getRequest, postRequest} from "@/api/request";

const apiRoute = {
    randomDiscussion: '/discussion/random',
    getAllGroup: '/group',
    getAllDiscussion: '/discussion',
}

export async function getRandomDiscussion(data) {
    return getRequest(apiRoute.randomDiscussion + '/', data);
}

export async function getAllGroup(data) {
    return getRequest(apiRoute.getAllGroup + '/', data);
}

export async function getGroupDetail(data, id) {
    return getRequest(apiRoute.getAllGroup + '/' + id + '/info/', data);
}

export async function getGroupMember(data, id) {
    return getRequest(apiRoute.getAllGroup + '/' + id + '/member/', data);
}

export async function getGroupRecentMember(data, id) {
    return getRequest(apiRoute.getAllGroup + '/' + id + '/member/recent/', data);
}

export async function getGroupDiscussion(data, id) {
    return getRequest(apiRoute.getAllGroup + '/' + id + '/discussion/', data);
}

export async function getGroupRecentDiscussion(data, id) {
    return getRequest(apiRoute.getAllGroup + '/' + id + '/discussion/random/', data);
}

export async function getIsGroupMember(data, id) {
    return getRequest(apiRoute.getAllGroup + '/' + id + '/is_member/', data);
}

export async function joinGroup(data, id) {
    return postRequest(apiRoute.getAllGroup + '/' + id + '/join/', data);
}

export async function quitGroup(data, id) {
    return deleteRequest(apiRoute.getAllGroup + '/' + id + '/join/', data);
}

export async function getGroupDiscussionDetail(data, id, discussionId) {
    return getRequest(apiRoute.getAllDiscussion + '/' + discussionId + '/', data);
}

export async function getDiscussionComment(data, id) {
    return getRequest(apiRoute.getAllDiscussion + '/' + id + '/comment/', data);
}

export async function addDiscussionComment(data, id) {
    return postRequest(apiRoute.getAllDiscussion + '/' + id + '/comment/add/', data);
}

export async function likeDiscussion(data, id) {
    return postRequest(apiRoute.getAllDiscussion + '/' + id + '/like/', data);
}

export async function dislikeDiscussion(data, id) {
    return deleteRequest(apiRoute.getAllDiscussion + '/' + id + '/like/', data);
}

export async function postDiscussion(data, group_id) {
    return postRequest('group/' + group_id + '/discussion/add/', data)
}