const Serializer = require('xmlrpc/lib/serializer')
const xmlParser = require('xml2json');

// api list
// https://github.com/fshost/xrpc/blob/master/example/app.js
export default function handler(req, res) {
    // ===============
    // handle request
    // ===============
    const reqXml = req.body
    // console.log("reqXml=>", reqXml)
    const parseResult = JSON.parse(xmlParser.toJson(reqXml)) || {}
    const reqJson = parseResult.methodCall || {}
    const reqParams = reqJson.params || []
    // console.log("reqJson=>", reqJson)
    // console.log("reqParams=>", reqParams)

    if(reqParams.length < 3){
        const error = "An error occurred!Parameter is too low!See document at https://xmlrpc.terwergreen.com/docs"
        const errorXml = Serializer.serializeFault(error)
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(errorXml),
            'Content-Type': 'text/xml'
        });
        res.end(errorXml)
        return
    }

    const reqMethodName = reqJson.methodName
    const username = reqParams.param[1].value
    const password = reqParams.param[2].value
    console.log("reqMethodName=>", reqMethodName)
    console.log("username=>", username)
    console.log("password=>", password)

    // 参数处理stream有问题，更换解析类库为xml2json
    // var deserializer = new Deserializer()
    // deserializer.deserializeMethodCall(req, function(error, methodName, params) {
    //     if(error){
    //         console.error(error)
    //     }
    //     console.log("reqMethodName=>", methodName)
    //     console.log("reqParams=>", params)
    // })

    // ===============
    // handle response
    // ===============
    // console.log("res=>", res);
    var userBlog = {
        blogid: '131097',
        url: 'https://www.cnblogs.com/tangyouwei/',
        blogName: '远方的灯塔'
    };
    var result = [];
    result.push(userBlog)
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

