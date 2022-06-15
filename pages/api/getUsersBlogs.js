var Serializer = require('../../node_modules/xmlrpc/lib/serializer'),
    Deserializer = require('../../node_modules/xmlrpc/lib/deserializer')

export default function handler(req, res) {
    // ===============
    // handle request
    // ===============
    const reqXml = req.body
    var deserializer = new Deserializer()
    const reqParams = deserializer.deserializeMethodCall(req.body)
    console.log("reqXml=>", reqXml)
    console.log("reqParams=>", reqParams)

    // ===============
    // handle response
    // ===============
    console.log("res=>", res);
    var json = {
        blogid: '131097',
        url: 'https://www.cnblogs.com/tangyouwei/',
        blogName: '远方的灯塔'
    };
    var xml = '<?xml version="1.0"?>';
    res.status(200).json(
        json
    )
}

