export function handler(
  defs: {
    method
    response
  }[]
) {
  return (req, res) => {
    for (let x = 0; x < defs.length; x++) {
      const def = defs[x]
      if (req.method == def.method) {
        return res.status(200).json(def.response)
      }
    }
    return res.status(404).json({ error: { message: "Not found." } })
  }
}
