const User = require("../model/user");

// middleware function to check if user has "admin" role
const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (user && user.role === "admin") {
    // user is authenticated and has the "admin" role, continue with request
    return next();
  }
  // user is not authenticated or does not have the "admin" role, send unauthorized response
  return res.status(401).json({ message: "Unauthorized" });
};

module.exports = isAdmin;