import Cors from "cors"
import initMiddleware from "../../../utils/cors/init-middleware"
import {NextApiRequest, NextApiResponse} from "next"

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

  // const headers = req.headers;
  // console.log(headers)
  const body = req.body
  console.log(body)

  const imageUrl = body.url
  fetch(imageUrl).then(async (response) => {
    let resJson = {}
    try {
      const blob = await response.blob()
      const bd = await blobToBase64(blob)
      resJson = {
        base64: bd
      }
    } catch (e) {
      console.error(e)
    }

    const finalRes = {
      headers: {
        status: response.status,
        statusText: response.statusText,
      },
      body: resJson,
    }
    console.log(finalRes)
    console.log("请求处理已成功")
    writeStatusData(res, finalRes, response.status)
  }).catch((reason) => {
    // console.log("methodPromise catch=>")
    console.log("请求处理失败")
    console.error("fetch middleware error=>", reason)
    writeError(res, reason)
  })
}


/**
 * 输出数据
 * @param res
 * @param data
 * @param status
 */
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

async function blobToBase64(blob: any) {
  let buffer = Buffer.from(await blob.text())
  return "data:" + blob.type + ';base64,' + buffer.toString('base64')
}