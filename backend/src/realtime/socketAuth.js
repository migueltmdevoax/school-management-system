import jwt from "jsonwebtoken";



export async function verifySocketToken(
  socket,
  next
) {

  try {

    const token =
      socket.handshake.auth
        ?.token;



    if (!token) {

      return next(
        new Error(
          "No token provided"
        )
      );
    }



    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET
      );



    socket.user = {

      id: decoded.id,

      role: decoded.role,
    };



    next();

  } catch (error) {

    console.error(
      "❌ Socket auth error:",
      error.message
    );

    next(
      new Error(
        "Authentication error"
      )
    );
  }
}