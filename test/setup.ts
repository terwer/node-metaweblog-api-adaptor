import { loadEnvConfig } from "@next/env"
import { resolve } from "path"
import { afterEach, beforeEach } from "vitest"

// 加载环境变量
loadEnvConfig(resolve(__dirname, ".."))

beforeEach(() => {
  console.log("======test is starting...======")
})

afterEach(() => {
  console.log("======test is finished.========")
})
