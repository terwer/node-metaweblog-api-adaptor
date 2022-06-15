import API_CONSTANTS from "../constant";
import CONF_API_CONSTANTS from "../confluence/conf-constant";
import {getSpaces} from "../confluence/conf-rest-api";

export default async function handleGetUsersBlogs(reqParams) {
    let error = null
    let result = []

    const appKey = reqParams.param[0].value
    const username = reqParams.param[1].value
    const password = reqParams.param[2].value
    console.log("appKey=>", appKey)
    console.log("username=>", username)
    console.log("password=>", password)

    // ========================
    // confluence adaptor 开始
    // ========================
    const [err, data] = await getSpaces()
    if (err) {
        error = {
            faultCode: API_CONSTANTS.FAULT_GET_USERS_BLOGS_ERROR,
            faultString: err
        }
    } else {
        // console.log("data=>", data)
        for (let idx in data) {
            let space = data[idx]
            if (space.key.toUpperCase() == CONF_API_CONSTANTS.DEFAULT_SPACE_KEY.toUpperCase()) {
                const userBlog = {
                    blogid: space.id,
                    url: 'https://youweics.atlassian.net/wiki/spaces/' + space.key,
                    blogName: space.name
                };
                result.push(userBlog)
            }
        }
    }
    // ========================
    // confluence adaptor 结束
    // ========================

    return [error, result]
}

