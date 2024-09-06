import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/models";
import connectDB from "@/config/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credientals",
      name: "credientals",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        console.log("Database connected");

        try {
          const user = await User.findOne({ email: credentials.email });
          console.log("User found:", user);

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            console.log("Password match:", isPasswordCorrect);

            if (isPasswordCorrect) {
              return user;
            } else {
              console.log("Incorrect password");
            }
          } else {
            console.log("User not found");
          }
        } catch (error) {
          console.error("Error in authorize:", error);
          throw new Error("Authentication failed");
        }
        return null; // Return null if authentication fails
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == "credientals") {
        return true;
      }
      return false; // Return false if sign-in fails
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
