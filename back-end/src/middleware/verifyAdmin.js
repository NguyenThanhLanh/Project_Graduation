const verifyAdminAuth = (req, res, next) => {
  const roleName = req.user.user.roleId.name;
  console.log("verify admin: ", roleName);
  if (roleName === "admin") return next();
  else return res.status(403).json("You're not allowed");
};

module.exports = verifyAdminAuth;
