const swts = require("@proerd/swagger-ts-template")
const fetch = require("node-fetch")
const path = require("path")

const API_BASE = "http://localhost:8080/v2/api-docs"

async function run() {
  const req = await fetch(API_BASE).then(r => r.json())
  await swts.genPaths(req, {
    moduleStyle: "esm",
    output: path.resolve(__dirname, "..", "components", "_api", "swagger")
  })
}
run()
