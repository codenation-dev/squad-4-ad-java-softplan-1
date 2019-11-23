module.exports = {
  presets: ["next/babel"],
  plugins: [
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
