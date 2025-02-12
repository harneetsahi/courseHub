import jwt from "jsonwebtoken";

function adminAuth(req, res, next) {
  const authorization = req.headers.authorization;
  const splitAuth = authorization.split(" ");
  const token = splitAuth[1];

  console.log(token);

  if (!token) {
    return res.json({ message: "Please log in" });
  }

  try {
    const decodedInfo = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    req.userId = decodedInfo.id;
    next();
  } catch (error) {
    console.log("token verification error");
    res.status(401).json({
      message: "Invalid or expired session",
    });
  }
}

export default adminAuth;
