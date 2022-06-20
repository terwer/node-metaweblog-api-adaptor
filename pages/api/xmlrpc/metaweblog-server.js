import handleGetUsersBlogs from "./metaweblog/getUsersBlogs";
import handleGetCategories from "./metaweblog/getCategories";
import handleNewPost from "./metaweblog/newPost";
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
        default:
            break
    }
}
