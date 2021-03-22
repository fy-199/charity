const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token =
    req.body.token || req.params.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, req.app.get("api_secret_key"), (err, decoded) => {
      if (err) {
        res.end("Failed to authenticate token...");
      } else {
        console.log(decoded);
        req.decode = decoded;
        next();
      }
    });
  } else {
    res.end("No token provided.");
  }
};