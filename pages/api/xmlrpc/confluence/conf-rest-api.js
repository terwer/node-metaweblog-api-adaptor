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
    // if (!resText.startsWith("{")) {
    //     const parseResult = JSON.parse(xmlParser.toJson(resText)) || {}
    //     // console.log("resText=>", resText)
    //     // console.log("parseResult=>", parseResult)
    //
    //     // if (parseResult.status["status-code"] != "200") {
    //     console.error(parseResult)
    //     throw new Error(parseResult.status.message)
    //     // }
    // }

    const json = JSON.parse(resText)
    if (json.statusCode) {
        error = JSON.stringify(json)
        console.error(error)
        throw new Error('Failed to fetch API')
    } else {
        data = json.results
    }
    return [error, data]
}

async function fetchAPI_POST(path, postData = {}) {
    const headers = {'Content-Type': 'application/json'}
    const username = process.env.CONFLUENCE_REST_USERNAME
    const password = process.env.CONFLUENCE_REST_PASSWORD

    if (process.env.CONFLUENCE_REST_USERNAME && process.env.CONFLUENCE_REST_PASSWORD) {
        // headers['Authorization'] = `Bearer ${process.env.CONFLUENCE_REST_TOKEN}`
        // headers['Authorization'] = 'Basic ' + base64.encode(username + ":" + password);
    }

    // confluence rest api
    const url = `${API_URL}` + path;
    const res = await fetch(url, {
        headers,
        method: 'POST',
        body: JSON.stringify(postData),
    })

    const resText = await res.text()
    if (!resText.startsWith("{")) {
        const parseResult = JSON.parse(xmlParser.toJson(resText)) || {}
        // console.log("resText=>", resText)
        // console.log("parseResult=>", parseResult)

        // if (parseResult.status["status-code"] != "200") {
        console.error(parseResult)
        throw new Error(parseResult.status.message)
        // }
    }

    const json = JSON.parse(resText)
    if (json.statusCode != 200) {
        console.error(json.statusCode + "=>" + JSON.stringify(json.data))
        throw new Error('Failed to fetch API')
    }
    return json.data
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

export async function getLabel(name) {
    const path = "/label?name=" + name
    const [error, data] = await fetchAPI_GET(path)
    return [error, data]
}