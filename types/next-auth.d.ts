import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // only accessToken exposed to app
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string; // all three live in the secure cookie
    refreshToken?: string;
    expiresAt?: number;
  }
}
