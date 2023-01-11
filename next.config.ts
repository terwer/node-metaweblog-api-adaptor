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
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 **/
const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(ts)x?$/, // Just `tsx?` file only
      use: [
        // options.defaultLoaders.babel, I don't think it's necessary to have this loader too
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            onlyCompileBundledFiles: true,
          },
        },
      ],
    })

    return config
  },
}

module.exports = nextConfig
