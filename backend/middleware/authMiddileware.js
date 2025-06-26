const tokenManager = require('../config/tokenManager');

const authMiddleware = async (req, res, next) => {
  try {
    const result = await tokenManager.verifyToken(req);

    if (!result.status) {
      return res.status(401).json({ message: result.msg });
    }

    req.user = result.data;
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(500).json({ message: "Auth Middleware Error", error: error.message });
  }
};

module.exports = authMiddleware;
