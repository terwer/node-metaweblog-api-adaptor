import handleGetUsersBlogs from "./metaweblog/getUsersBlogs";
import handleGetCategories from "./metaweblog/getCategories";
import API_CONSTANTS from "./constant"

export default async function handleResponse(reqMethodName, reqParams) {
    switch (reqMethodName) {
        case API_CONSTANTS.GET_USERS_BLOGS:
            return await handleGetUsersBlogs(reqParams);
            break
        case API_CONSTANTS.GET_CATEGORIES:
            return await handleGetCategories(reqParams);
            break
        default:
            break
    }
}
