// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import jieba from "@node-rs/jieba"
import Cors from "cors"
import initMiddleware from "../../utils/cors/init-middleware"
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

  let json
  const q = req.query.q || ""
  if (q instanceof Array) {
    throw new Error("参数类型错误")
  }

  if (!q || q === "") {
    json = { result: [] }
    res.json(json)
    return
  }

  const result = jieba.cut(q)
  json = { result: result }

  // Rest of the API logic
  res.json(json)
}
