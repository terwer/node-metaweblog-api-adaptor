import Cors from "cors"
import initMiddleware from "../../utils/cors/init-middleware"
import { NextApiRequest, NextApiResponse } from "next"
import * as cheerio from "cheerio"
// @ts-ignore
import Prism from "prismjs"
// @ts-ignore
import loadLanguages from "prismjs/components/index"
import { decode } from "html-entities"

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

  try {
    // properly parse and format all hightlighted
    // code blocks on the server
    const $ = cheerio.load(html)
    const $codes = $("code[class^=language]")
    if ($codes.length > 0)
      $codes.each(function () {
        const $code = $(this)

        const lang = $code.attr("class")?.replace("language-", "") ?? "text"
        const code = decode($code.html())
        // default loaded languages with prisma, skip to decrease build times
        if (!["clike", "markup"].includes(lang)) {
          loadLanguages([lang])
        }
        $code.html(Prism.highlight(code, Prism.languages[lang], code))
        $code.addClass(`prism language-${lang}`)
        html = $.html()
      })
  } catch (e) {
    console.error("prismjs parse error", e)
  }

  json = {
    html: html,
  }

  res.json(json)
}
