console.log("babelrc BACKEND_URL", process.env.BACKEND_URL || "http://localhost:8080")
module.exports = {
  presets: ["next/babel"],
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    [
      "transform-define",
      {
        "process.env.BACKEND_URL": process.env.BACKEND_URL || "http://localhost:8080",
        "process.env.CLIENT_ID": process.env.CLIENT_ID || "clientid",
        "process.env.CLIENT_SECRET": process.env.CLIENT_SECRET || "123456"
      }
    ]
  ]
}
