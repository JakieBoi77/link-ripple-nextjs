import connect from "@/lib/db";
import User from "@/lib/models/user"
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_JWT = process.env.NEXT_PUBLIC_SECRET_JWT as string;

export const POST = async (request: Request) => {
  try {
    await connect();

    const { tokenMail } = await request.json();
    if (!tokenMail) {
      return new Response(
        JSON.stringify({ message: "Missing token mail", status: "error" }),
        { status: 400 }
      );
    }
    
    const decodedTokenMail = jwt.verify(tokenMail, SECRET_JWT) as JwtPayload;
    const email = decodedTokenMail.email;
    const user = await User.findOne({ email: email });
    const userData = {
      name: user?.name,
      role: user?.role,
      bio: user?.bio,
      avatar: user?.avatar,
      handle: user?.handle,
      links: user?.links?.length || 0
    };

    return new Response(
      JSON.stringify({ message: "User successfully loaded.", userData, status: "success" }),
      { status: 200 }
    );

  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ message: "An error occurred.", status: "error" }),
      { status: 500 }
    );
  }

}