const Serializer = require('xmlrpc/lib/serializer')
const xmlParser = require('xml2json');
import handleResponse from "./metaweblog-server"
import API_CONSTANTS from "./constant";

// api list
// https://github.com/fshost/xrpc/blob/master/example/app.js
export default async function handler(req, res) {
    // ===============
    // handle request
    // ===============
    const reqXml = req.body
    // console.log("reqXml=>", reqXml)
    const parseResult = JSON.parse(xmlParser.toJson(reqXml)) || {}
    const reqJson = parseResult.methodCall || {}
    const reqMethodName = reqJson.methodName || ""
    const reqParams = reqJson.params || []
    // console.log("reqMethodName=>", reqMethodName)
    // console.log("reqParams=>", reqParams)

    if (reqMethodName == "") {
        const error = {
            faultCode: API_CONSTANTS.FAULT_CODE_NO_METHOD_NAME,
            faultString: "An error occurred!reqMethodName cannot be null!See document at https://xmlrpc.terwergreen.com/docs"
        }
        const errorXml = Serializer.serializeFault(error)
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(errorXml),
            'Content-Type': 'text/xml'
        });
        res.end(errorXml)
        return
    }

    if (reqParams.length < 3) {
        const error = {
            faultCode: API_CONSTANTS.FAULT_CODE_ARGUEMENT_ERROR,
            faultString: "An error occurred!Parameter is too low!See document at https://xmlrpc.terwergreen.com/docs"
        }
        const errorXml = Serializer.serializeFault(error)
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(errorXml),
            'Content-Type': 'text/xml'
        });
        res.end(errorXml)
        return
    }

    // ===============
    // handle response
    // ===============
    // console.log("res=>", res);
    const [error, result] = await handleResponse(reqMethodName, reqParams)
    if (error) {
        const errorXml = Serializer.serializeFault(error)
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(errorXml),
            'Content-Type': 'text/xml'
        });
        res.end(errorXml)
        return
    }

    var resXml = Serializer.serializeMethodResponse(result)
    // console.log("resXml=>", resXml)
    // res.setHeader('content-type', "text/xml")
    // res.write(resXml)
    // Calling response.writeHead method
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(resXml),
        'Content-Type': 'text/xml'
    });
    res.end(resXml)
    // res.status(200).json(
    //     result
    // )
}