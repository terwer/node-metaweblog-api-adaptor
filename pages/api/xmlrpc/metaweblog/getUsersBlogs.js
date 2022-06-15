import API_CONSTANTS from "../constant";

export default async function handleGetUsersBlogs(reqParams) {
    let error = null
    let result = []

    const appKey = reqParams.param[0].value
    const username = reqParams.param[1].value
    const password = reqParams.param[2].value
    console.log("appKey=>", appKey)
    console.log("username=>", username)
    console.log("password=>", password)

    const userBlog = {
        blogid: '131097',
        url: 'https://www.cnblogs.com/tangyouwei/',
        blogName: '远方的灯塔1'
    };
    result.push(userBlog)

    // error = {
    //     faultCode: API_CONSTANTS.FAULT_GET_USERS_BLOGS_ERROR,
    //     faultString: "handleGetUsersBlogs has error!"
    // }

    return [error, result]
}

