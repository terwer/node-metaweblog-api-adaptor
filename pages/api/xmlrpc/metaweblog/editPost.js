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
    let tags = []
    for (let idx in postJson) {
        const item = postJson[idx]
        if (item.name == "title") {
            title = item.value.string || ""
            console.log("title=>", item.value)
        }
        if (item.name == "description") {
            description = item.value.string || ""
            console.log("description=>", item.value)
        }
        if (item.name == "categories") {
            if (item.value.array.data.value) {
                categories = item.value.array.data.value
            }
        }
        if (item.name == "mt_keywords") {
            if (item.value.string) {
                tags = item.value.string.split(",");
            }
        }
    }

    [error, result] = await editPage(postid, title, description, tags)
    // ========================
    // confluence adaptor 结束
    // ========================

    return [error, result]
}
