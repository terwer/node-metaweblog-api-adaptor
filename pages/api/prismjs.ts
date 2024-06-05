import Cors from "cors"
import initMiddleware from "../../utils/cors/init-middleware"
import { NextApiRequest, NextApiResponse } from "next"
import * as cheerio from "cheerio"
// @ts-ignore
import Prism from "prismjs"
// @ts-ignore
import loadLanguages from "prismjs/components/index"

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

  let json

  const body = req.body
  let html = body.html
  // Prism.highlight
  // properly parse and format all hightlighted
  // code blocks on the server
  const $ = cheerio.load(html)
  const $codes = $("pre.code-block[data-language] code")
  if ($codes.length > 0)
    $codes.each((index, elem) => {
      const lang = $(elem).parent().attr("data-language") ?? "plaintext"
      const code = $(elem).html()

      $(elem).html(Prism.highlight(code, Prism.languages[lang], code))
      $(elem).addClass(`prism language-${lang}`)
      html = $("body").html() ?? "<p>代码块解析错误</p>"
    })

  json = {
    html: html,
  }

  res.json(json)
}
