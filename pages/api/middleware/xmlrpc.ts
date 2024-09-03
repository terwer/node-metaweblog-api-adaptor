import Cors from "cors"
import initMiddleware from "../../../utils/cors/init-middleware"
import { SimpleXmlRpcClient } from "simple-xmlrpc"
import { NextApiRequest, NextApiResponse } from "next"
import { AppInstance } from "../../../utils/AppInstance"
import { Base64 } from "js-base64"

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  }),
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Run cors
  await cors(req, res)

  // const headers = req.headers
  // console.log(headers)
  const body = req.body

  // 获取代理参数
  // console.log("body=>", body)

  // =====================================
  // =====================================
  // 发送真实请求并获取结果
  console.log("开始发送真实请求并获取结果")
  const xmlrpcApiUrl = body.fetchParams.apiUrl
  const xmlrpcCORSParams = body.fetchParams.fetchCORSParams

  let err
  try {
    // console.log("xmlrpcApiUrl=>", xmlrpcApiUrl)
    // console.log("xmlrpcCORSParams.reqMethod=>", xmlrpcCORSParams.reqMethod)
    // console.log("xmlrpcCORSParams.reqParams=>", xmlrpcCORSParams.reqParams)

    const appInstance = new AppInstance()
    const client = new SimpleXmlRpcClient(appInstance, xmlrpcApiUrl)

    let reqParams = xmlrpcCORSParams.reqParams
    // 专属处理文件上传
    if (
      xmlrpcCORSParams.isNewMediaObjectRequest === "true" &&
      reqParams.length === 4
    ) {
      const file = reqParams[3]
      const bits = Buffer.from(file, "base64")
      const name = body.name ?? `random-${Date.now()}.png`
      const type = body.type ?? "image/jpeg"
      // 设置文件的元数据
      const metadata = {
        name: name,
        type: type,
        bits: bits,
        overwrite: true,
      }
      reqParams = [reqParams[0], reqParams[1], reqParams[2], metadata]
    }
    const methodPromise = client.methodCall(
      xmlrpcCORSParams.reqMethod,
      reqParams,
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
