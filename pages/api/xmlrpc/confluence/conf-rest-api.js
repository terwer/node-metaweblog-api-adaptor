import CONF_API_CONSTANTS from "./conf-constant";

const API_URL = process.env.CONFLUENCE_REST_API_URL
const xmlParser = require('xml2json');
const base64 = require('base-64');

async function fetchAPI_GET(path) {
    let error = null
    let data = null

    const headers = {'Content-Type': 'application/json'}
    const username = process.env.CONFLUENCE_REST_USERNAME
    const password = process.env.CONFLUENCE_REST_PASSWORD

    if (process.env.CONFLUENCE_REST_USERNAME && process.env.CONFLUENCE_REST_PASSWORD) {
        // headers['Authorization'] = `Bearer ${process.env.CONFLUENCE_REST_TOKEN}`
        headers['Authorization'] = 'Basic ' + base64.encode(username + ":" + password);
    }

    // confluence rest api
    const url = `${API_URL}` + path;
    const res = await fetch(url, {
        headers,
        method: 'GET'
    })

    const resText = await res.text()

    const json = JSON.parse(resText)
    if (json.statusCode) {
        error = JSON.stringify(json)
        console.error(error)
        throw new Error('Failed to fetch API')
    } else {
        data = json.results || json
    }
    return [error, data]
}

async function fetchAPI_POST(path, postData = {}) {
    let error = null
    let data = null

    const headers = {'Content-Type': 'application/json'}
    const username = process.env.CONFLUENCE_REST_USERNAME
    const password = process.env.CONFLUENCE_REST_PASSWORD

    if (process.env.CONFLUENCE_REST_USERNAME && process.env.CONFLUENCE_REST_PASSWORD) {
        // headers['Authorization'] = `Bearer ${process.env.CONFLUENCE_REST_TOKEN}`
        headers['Authorization'] = 'Basic ' + base64.encode(username + ":" + password);
    }

    // confluence rest api
    const url = `${API_URL}` + path;
    const res = await fetch(url, {
        headers,
        method: 'POST',
        body: JSON.stringify(postData),
    })

    const resText = await res.text()

    const json = JSON.parse(resText)
    if (json.statusCode) {
        error = JSON.stringify(json)
        console.error(error)
        throw new Error('Failed to fetch API')
    } else {
        data = json.id + "_" + json.version.number
    }
    return [error, data]
}

async function fetchAPI_PUT(path, postData = {}) {
    let error = null
    let data = null

    const headers = {'Content-Type': 'application/json'}
    const username = process.env.CONFLUENCE_REST_USERNAME
    const password = process.env.CONFLUENCE_REST_PASSWORD

    if (process.env.CONFLUENCE_REST_USERNAME && process.env.CONFLUENCE_REST_PASSWORD) {
        // headers['Authorization'] = `Bearer ${process.env.CONFLUENCE_REST_TOKEN}`
        headers['Authorization'] = 'Basic ' + base64.encode(username + ":" + password);
    }

    // confluence rest api
    const url = `${API_URL}` + path;
    const res = await fetch(url, {
        headers,
        method: 'PUT',
        body: JSON.stringify(postData),
    })

    const resText = await res.text()

    const json = JSON.parse(resText)
    if (json.statusCode) {
        error = JSON.stringify(json)
        console.error(error)
        throw new Error('Failed to fetch API')
    } else {
        data = json.id
    }
    return [error, data]
}

/**
 * 获取知识空间
 * @returns {Promise<(string|number|SpeechRecognitionResultList|*)[]>}
 */
export async function getSpaces() {
    const expansions = []
    const path = "/space?expand=" + expansions.join(",")
    const [error, data] = await fetchAPI_GET(path)
    return [error, data]
}

export async function newPage(wikiPageTitle, wikiPage, labels) {
    // 1、准备数据
    const wikiSpace = CONF_API_CONSTANTS.DEFAULT_SPACE_KEY;
    const parentPageId = CONF_API_CONSTANTS.DEFAULT_PARENT_PAGE_ID

    const newPage = defineConfluencePage(wikiPageTitle, wikiPage, wikiSpace, labels, parentPageId)
    const path = "/content"

    const [error, data] = await fetchAPI_POST(path, newPage)
    return [error, data]
}

export async function getPage(pageid) {
    const path = "/content/" + pageid
    const [error, data] = await fetchAPI_GET(path)
    return [error, data]
}

export async function editPage(postid, wikiPageTitle, wikiPage, labels) {
    // 1、准备数据
    const wikiSpace = CONF_API_CONSTANTS.DEFAULT_SPACE_KEY;
    const parentPageId = CONF_API_CONSTANTS.DEFAULT_PARENT_PAGE_ID

    let newPage = defineConfluencePage(wikiPageTitle, wikiPage, wikiSpace, labels, parentPageId)

    const idarr = postid.split("_")
    const pageid = idarr[0]
    // const version = parseInt(idarr[1]) + 1
    const path = "/content/" + pageid
    // // "version": {
    // //     "number": 19
    // // },
    // newPage.version = {
    //     "number": version
    // }
    // 查询最新版本
    const [qerror, qdata] = await getPage(pageid)
    console.log("qdata=>", qdata)
    if (qdata) {
        const version = qdata.version.number + 1
        newPage.version = {
            "number": version
        }
    }

    const [error, data] = await fetchAPI_PUT(path, newPage)

    // if(error){
    //     // 自动新增版本
    //     const errorObj = JSON.parse(error)
    //     if(errorObj.statusCode == 409){
    //
    //     }
    // }
    return [error, data]
}

// curl -X POST -H "Authorization: Basic eW91d2VpY3NAMTYzLmNvbTpWRW0xS1J1UmpXeVp3cmNpS3VkdjU5QUQ="  -H 'Content-Type: application/json' -d'{"type":"page","title":"My Awesome Page","ancestors":[{"id":1277961}],"space":{"key":"SPC"},"body":{"storage":{"value":"<h1>Things That Are Awesome</h1><ul><li>Birds</li><li>Mammals</li><li>Decapods</li></ul>","representation":"storage"}},"metadata":{"labels":[{"prefix":"global","name":"journal"},{"prefix":"global","name":"awesome_stuff"}]}}' https://youweics.atlassian.net/wiki/rest/api/content | python -mjson.tool
function defineConfluencePage(pageTitle, wikiEntryText, pageSpace, labels, parentPageId) {
    const newPage = new Object()

    // "type":"page",
    // "title":"My Awesome Page"
    newPage.type = "page"
    newPage.title = pageTitle

    // "ancestors":[{"id":1277961}]
    const parentPageArray = new Array()
    const parentPage = {"id": parentPageId}
    parentPageArray.push(parentPage)
    newPage.ancestors = parentPageArray

    // "space":{"key":"SPC"}
    const spaceObj = {"key": pageSpace}
    newPage.space = spaceObj

    // "body":
    // {"storage":{"value":"<p><h1>Things That Are Awesome</h1><ul><li>Birds</li><li>Mammals</li><li>Decapods</li></ul></p>","representation":"storage"}
    // }
    // 去除多余的换行
    wikiEntryText = wikiEntryText.replace(/[\r\n]<\/code><\/pre>[\r\n]/g, "</code></pre>");
    // 去掉h1标签
    wikiEntryText = wikiEntryText.replace(/<h1.*?>.*?<\/h1>\n/ig,'');
    const bodyObj = {
        "storage": {
            "value": wikiEntryText,
            "representation": "storage"
        }
    }
    newPage.body = bodyObj

    //LABELS
    // "metadata":
    // {"labels":[
    //            {"prefix":"global",
    //            "name":"journal"},
    //            {"prefix":"global",
    //            "name":"awesome_stuff"}
    //           ]
    // }
    const newLabels = new Array()
    for (let idx in labels) {
        const item = labels[idx].string || labels[idx]
        const newLabel = {
            "prefix": item,
            "name": item
        }
        newLabels.push(newLabel)
    }
    const labelsObj = {
        "labels": newLabels
    }
    newPage.metadata = labelsObj

    return newPage
}