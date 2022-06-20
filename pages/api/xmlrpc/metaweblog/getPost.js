import {getPage} from "../confluence/conf-rest-api";

export default async function handleGetPost(reqParams) {
    let error = null
    let result = null

    const postid = reqParams.param[0].value.string || reqParams.param[0].value.int
    const username = reqParams.param[1].value
    const password = reqParams.param[2].value
    console.log("postid=>", postid)
    console.log("username=>", username)
    console.log("password=>", password)

    // ========================
    // confluence adaptor 开始
    // ========================
    const [perror, presult] = await getPage(postid)
    if (perror) {
        error = perror
    }
    if (presult) {
        const content = {
            dateCreated: presult.version.when,
            description: presult.body.storage.value,
            title: presult.title,
            categories: [],
            enclosure: {"length": 0},
            link: presult._links.webui,
            permalink: presult._links.tinyui,
            postid: presult.id,
            source: {},
            mt_keywords: '',
            wp_slug: ''
        }

        result = content;
    }
    // ========================
    // confluence adaptor 结束
    // ========================
    return [error, result]
}