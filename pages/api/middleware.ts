import Cors from "cors"
import initMiddleware from "../../utils/cors/init-middleware"
// import { SimpleXmlRpcClient } from "simple-xmlrpc"
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
  result = {
    test: "test",
  }

  // Rest of the API logic
  res.status(200).json(result)
}
