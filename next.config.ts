import path from "path"
import { NextConfig } from "next"

/**
 * 获取模块路径
 * @param m 模块名称
 */
function moduleDir(m: string) {
  return path.dirname(require.resolve(`${m}/package.json`))
}

console.log("react path=>", moduleDir("react"))

/**
 * @type {import('next').NextConfig}
 * @see https://nextjs.org/docs/api-reference/next.config.js/
 **/
const nextConfig: NextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
