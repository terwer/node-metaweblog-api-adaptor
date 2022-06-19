/**
 * 获取博客信息
 * @type {string}
 */
const GET_USERS_BLOGS = "blogger.getUsersBlogs"
const GET_CATEGORIES = "metaWeblog.getCategories"

const FAULT_CODE_NO_METHOD_NAME = "0000"
const FAULT_CODE_ARGUEMENT_ERROR = "0001"
const FAULT_GET_USERS_BLOGS_ERROR = "1000"


const API_CONSTANTS = {
    GET_USERS_BLOGS,
    GET_CATEGORIES,
    FAULT_CODE_NO_METHOD_NAME,
    FAULT_CODE_ARGUEMENT_ERROR,
    FAULT_GET_USERS_BLOGS_ERROR
}

export default API_CONSTANTS