const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookie["auth_token"];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decode.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;
