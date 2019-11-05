export function handler(
  defs: {
    method;
    response;
  }[]
) {
  return (req, res) => {
    res.setHeader("Content-Type", "application/json");
    for (let x = 0; x < defs.length; x++) {
      const def = defs[x];
      if (req.method == def.method) {
        res.statusCode = 200;
        res.end(JSON.stringify(def.response));
        return;
      }
    }
    res.statusCode = 404;
    res.end({ error: { message: "Not found." } });
  };
}
