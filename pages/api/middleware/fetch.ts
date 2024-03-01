import Cors from "cors"
import initMiddleware from "../../../utils/cors/init-middleware"
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

  // const headers = req.headers;
  // console.log(headers)
  const body = req.body
  // console.log(body)

  // 获取代理参数
  // console.log("body.fetchParams.apiUrl=>")
  // console.log(body.fetchParams.apiUrl)
  // console.log("body.fetchParams.fetchOptions=>")
  // console.log(body.fetchParams.fetchOptions)
  // console.log("body.fetchParams.formJson=>")
  // console.log(body.fetchParams.formJson)

  // =====================================
  // =====================================
  // 发送真实请求并获取结果
  // console.log("开始发送真实请求并获取结果")

  const fetchCORSApiUrl = body.fetchParams.apiUrl
  const fetchCORSOptions = body.fetchParams.fetchOptions
  const formJson = body.fetchParams.formJson

  // 如果是form请求，进行转换
  if (formJson) {
    // 将formJson转换为formData
    const form = new URLSearchParams()
    formJson.forEach((item: any) => {
      form.append(item.key, item.value)
    })
    fetchCORSOptions.body = form
  }

  let err
  console.log("fetchCORS.apiUrl=>")
  console.log(fetchCORSApiUrl)
  console.log("fetchCORS.fetchOptions=>")
  console.log(fetchCORSOptions)

  fetch(fetchCORSApiUrl, fetchCORSOptions)
    .then((response) => {
      try {
        const myHeaders = response.headers
        const setCookie = myHeaders.get("Set-Cookie")
        const corsHeaders = {
          "Set-Cookie": setCookie,
        }
        console.log("corsHeaders =>", corsHeaders)

        response.text().then((resText) => {
          // console.log("请求完成，准备返回真实结果")
          let resJson = {} as any
          try {
            resJson = JSON.parse(resText)
          } catch (e) {
            console.error(e)
          }
          resJson["cors-received-headers"] = JSON.stringify(corsHeaders)
          // console.log(resJson)

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
        })
      } catch (e) {
        err = e
        writeStatusError(res, err, response.status)
        console.log("请求处理异常")
        console.error(e)
      }
    })
    .catch((reason) => {
      // console.log("methodPromise catch=>")
      console.log("请求处理失败")
      console.error("fetch middleware error=>", reason)
      writeError(res, reason)
    })
  // ========================================
  // ========================================
}

/**
 * 输出数据
 * @param res
 * @param data
 */
// function writeData(res: NextApiResponse, data: any) {
//   writeStatusData(res, data, 200)
// }

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
