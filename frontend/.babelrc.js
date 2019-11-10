module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "transform-define",
      {
        "process.env.BACKEND_URL": process.env.BACKEND_URL || "http://localhost:3000/api"
      }
    ]
  ]
}
