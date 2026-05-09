import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { getDatabase } from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim();
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        const db = await getDatabase();
        const user = await db.collection("users").findOne({
          email: email.toLowerCase(),
        });

        if (!user?.password || typeof user.password !== "string") {
          return null;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          return null;
        }

        return {
          id: String(user._id),
          email: user.email as string,
          name: user.name as string,
          role: user.role as "user" | "developer" | "admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user && "role" in user && user.role) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? session.user.id;
        if (token.role) {
          session.user.role = token.role as
            | "user"
            | "developer"
            | "admin";
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
