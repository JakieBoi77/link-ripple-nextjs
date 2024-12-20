import connect from "@/lib/db";
import User from "@/lib/models/user"
import jwt from "jsonwebtoken";

const SECRET_JWT = process.env.SECRET_JWT as string;

export const POST = async (request: Request) => {
  try {
    await connect();

    const defaultLink = { url: "https://github.com/xSankalpaD/Link-Ripple", title: "Link-Ripple", icon: '' }

    const { handle, email, password, category } = await request.json();
    const user = await User.create({ handle, email, password, role: category, links: [defaultLink] });
    const token = jwt.sign({ email: email }, SECRET_JWT);

    return new Response(
      JSON.stringify({ message: "User successfully created.", status: "success", token, id: user._id }),
      { status: 200 }
    );

  } catch (err: unknown) {
    console.log(err)

    if (typeof err === "object" && err !== null && "code" in err) {
      const error = err as { code: number };
      if (error.code === 11000) {
        return new Response(
          JSON.stringify({ message: "Try a different handle or email.", status: "error" }),
          { status: 500 }
        );
      }
    }

    return new Response(
      JSON.stringify({ message: "An error occurred", status: "error" }),
      { status: 500 }
    );
  }
}