import Cors from "cors"
import initMiddleware from "../../utils/cors/init-middleware"
import { SimpleXmlRpcClient } from "simple-xmlrpc"
import { NextApiRequest, NextApiResponse } from "next"

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run cors
  await cors(req, res)

  let result

  const headers = req.headers
  console.log(headers)
  const body = req.body

  // 获取代理参数
  console.log("body=>", body)

  // =====================================
  // =====================================
  // 发送真实请求并获取结果
  console.log("开始发送真实请求并获取结果")
  const xmlrpcApiUrl = body.fetchParams.apiUrl
  const xmlrpcCORSParams = body.fetchParams.fetchCORSParams

  let err
  try {
    // console.log("xmlrpcCORSParams.reqMethod=>")
    // console.log(xmlrpcCORSParams.reqMethod)
    // console.log("xmlrpcCORSParams.reqParams=>")
    // console.log(xmlrpcCORSParams.reqParams)

    const client = new SimpleXmlRpcClient(xmlrpcApiUrl)

    const methodPromise = client.methodCall(
      xmlrpcCORSParams.reqMethod,
      xmlrpcCORSParams.reqParams
    )
    methodPromise
      .then((resolve) => {
        // console.log("methodPromise resolve=>")
        // console.log(resolve)

        writeData(res, resolve)
        console.log("请求处理已成功")
      })
      .catch((reason) => {
        console.log("methodPromise catch=>")
        console.error("xmlrpc middleware error", reason)
        writeError(res, reason)
        console.log("请求处理失败")
      })
  } catch (e) {
    err = e
    console.error(e)
    writeError(res, err)
    console.log("请求处理异常")
  }
  // ========================================
  // ========================================
}

/**
 * 输出数据
 * @param res
 * @param data
 */
function writeData(res: NextApiResponse, data: any) {
  writeStatusData(res, data, 200)
}

function writeStatusData(res: NextApiResponse, data: any, status: number) {
  // Rest of the API logic
  res.status(status)
  res.json(data)
}

/**
 * 输出错误信息
 * @param res
 * @param err
 */
function writeError(res: NextApiResponse, err: any) {
  writeStatusError(res, err, 500)
}

function writeStatusError(res: NextApiResponse, err: any, status: number) {
  const errorJson = JSON.stringify(err)
  res.status(status)
  res.json(errorJson)
}
