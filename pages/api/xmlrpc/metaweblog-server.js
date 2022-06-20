import handleGetUsersBlogs from "./metaweblog/getUsersBlogs";
import handleGetCategories from "./metaweblog/getCategories";
import handleNewPost from "./metaweblog/newPost";
import handleEditPost from "./metaweblog/editPost";
import handleGetPost from "./metaweblog/getPost";
import handleGetRecentPosts from "./metaweblog/getRecentPosts";
import API_CONSTANTS from "./constant"

export default async function handleResponse(reqMethodName, reqParams) {
    switch (reqMethodName) {
        case API_CONSTANTS.METAWEBLOG_GET_USERS_BLOGS:
            return await handleGetUsersBlogs(reqParams);
            break
        case API_CONSTANTS.METAWEBLOG_GET_CATEGORIES:
            return await handleGetCategories(reqParams);
            break
        case API_CONSTANTS.METAWEBLOG_NEW_POST:
            return await handleNewPost(reqParams)
            break
        case API_CONSTANTS.METAWEBLOG_EDIT_POST:
            return await handleEditPost(reqParams)
            break
        case API_CONSTANTS.METAWEBLOG_GET_POST:
            return await handleGetPost(reqParams)
            break
        case API_CONSTANTS.METAWEBLOG_GET_RECEBT_POSTS:
            return await handleGetRecentPosts(reqParams)
            break;
        default:
            break
    }
}
