import API_CONSTANTS from "../constant";
import CONF_API_CONSTANTS from "../confluence/conf-constant";

export default async function handleGetCategories(reqParams) {
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
    let cat = {
        description: 'java',
        htmlUrl: '',
        rssUrl: '',
        title: 'java',
        categoryid: '1'
    };
    let cat2 = {
        description: 'node',
        htmlUrl: '',
        rssUrl: '',
        title: 'node',
        categoryid: '2'
    };
    result.push(cat)
    result.push(cat2)
    // ========================
    // confluence adaptor 结束
    // ========================

    return [error, result]
}