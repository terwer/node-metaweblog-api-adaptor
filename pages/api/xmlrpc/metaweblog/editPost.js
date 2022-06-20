import {editPage} from "../confluence/conf-rest-api";

export default async function handleEditPost(reqParams) {
    let error = null
    let result = "0"

    const postid = reqParams.param[0].value.string || reqParams.param[0].value.int
    const username = reqParams.param[1].value
    const password = reqParams.param[2].value
    console.log("postid=>", postid)
    console.log("username=>", username)
    console.log("password=>", password)

    const struct = reqParams.param[3].value
    const publish = reqParams.param[4].value
    console.log("struct=>", struct)
    console.log("publish=>", publish)

    // ========================
    // confluence adaptor 开始
    // ========================
    const postJson = struct.struct.member
    let title = ""
    let description = ""
    let categories = []
    for (let idx in postJson) {
        const item = postJson[idx]
        if (item.name == "title") {
            title = item.value.string
            console.log("title=>", item.value)
        }
        if (item.name == "description") {
            description = item.value.string
            console.log("description=>", item.value)
        }
        if (item.name == "categories") {
            categories = item.value.array.data.value
            console.log("categories=>", item.value)
        }
    }

    [error, result] = await editPage(postid, title, description, categories)
    // ========================
    // confluence adaptor 结束
    // ========================

    return [error, result]
}
