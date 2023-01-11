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

  const q = req.query.q
  const v = await fetch(
    "https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=en-US&q=" +
      q
  )
  let json = await v.json()

  // Rest of the API logic
  res.json(json)
}
