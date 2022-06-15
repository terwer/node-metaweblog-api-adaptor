import handleGetUsersBlogs from "./metaweblog/getUsersBlogs";
import API_CONSTANTS from "./constant"

export default async function handleResponse(reqMethodName, reqParams) {
    switch (reqMethodName) {
        case API_CONSTANTS.GET_USERS_BLOGS:
            const [error, result] = await handleGetUsersBlogs(reqParams);
            return [error, result];
            break
        default:
            break
    }
}
