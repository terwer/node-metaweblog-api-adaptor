import { describe, it } from "vitest"
import { SimpleXmlRpcClient } from "simple-xmlrpc"

describe("test xmlrpc", () => {
  function writeData(data: any) {
    writeStatusData(data, 200)
  }

  function writeStatusData(data: any, status: number) {
    console.log(status, data)
  }

  function writeError(err: any) {
    writeStatusError(err, 500)
  }

  function writeStatusError(err: any, status: number) {
    const errorJson = JSON.stringify(err)
    console.log(status, errorJson)
  }

  it("test xmlrpc handler", async function () {
    // 发送真实请求并获取结果
    console.log("开始发送真实请求并获取结果")

    const apiUrl = process.env.XMLRPC_API_URL || ""
    const blogid = process.env.XMLRPC_BLOGID || ""
    const username = process.env.XMLRPC_USERNAME || ""
    const password = process.env.XMLRPC_PASSWORD || ""

    const xmlrpcApiUrl = apiUrl
    const reqMethod = "blogger.getUsersBlogs"
    const reqParams = [blogid, username, password]

    let err
    try {
      const client = new SimpleXmlRpcClient(xmlrpcApiUrl)

      const result = await client.methodCall(reqMethod, reqParams)
      writeData(result)
      console.log("请求处理已成功")
    } catch (e) {
      err = e
      console.error(e)
      writeError(err)
      console.log("请求处理异常")
    }
  })
})
