import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id?: string;
      role?: "user" | "developer" | "admin";
    };
  }

  interface User {
    role?: "user" | "developer" | "admin";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "user" | "developer" | "admin";
  }
}
