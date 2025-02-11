import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.json({ message: "Please log in" });
  }

  let decodedInfo;
  try {
    decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log("token verification error");
    res.status(401).json({
      message: "Invalid or expired session",
    });
  }

  if (decodedInfo) {
    req.userId = decodedInfo.id;
    next();
  } else {
    return res.json("User not logged in");
  }
}

export default auth;
