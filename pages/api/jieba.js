// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nodejieba from "nodejieba";
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)

export default async function handler(req, res) {
    // Run cors
    await cors(req, res)

    let json
    const q = req.query.q
    if (!q || q === "") {
        json = {result: []}
        res.json(json)
        return
    }

    const result = nodejieba.cut(q);
    json = {result: result}

    // Rest of the API logic
    res.json(json)
}
