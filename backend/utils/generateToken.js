import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  console.log("token", token);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export const generateAdminToken = (res, adminId)=>{
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  console.log("token", token);

  res.cookie("jwtAdmin", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
}

// export default generateToken;
