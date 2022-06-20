import {getPages} from "../confluence/conf-rest-api";

export default async function handleGetRecentPosts(reqParams) {
    let error = null
    let result = []

    const num = reqParams.param[3].value.string || reqParams.param[3].value.int || 10
    const username = reqParams.param[1].value
    const password = reqParams.param[2].value
    console.log("num=>", num)
    console.log("username=>", username)
    console.log("password=>", password)

    // ========================
    // confluence adaptor 开始
    // ========================
    const [perror, presult] = await getPages(num)
    if (perror) {
        error = perror
    }
    if (presult) {
        for (let idx in presult) {
            const item = presult[idx]

            const content = {
                dateCreated: item.version.when,
                description: item.body.storage.value,
                title: item.title,
                categories: [],
                enclosure: {"length": 0},
                link: item._links.webui,
                permalink: item._links.tinyui,
                postid: item.id,
                source: {},
                mt_keywords: '',
                wp_slug: ''
            }

            result.push(content)
        }
    }
    // ========================
    // confluence adaptor 结束
    // ========================
    return [error, result]
}