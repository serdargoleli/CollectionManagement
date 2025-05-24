// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IResponseModel } from "@/models/IResponseModel";
import { ILoginResponseModel } from "@/models/ILoginResponseModel";
import { ENDPOINTS_PATH } from "@/constants/endpoints";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "E-posta", type: "text" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${ENDPOINTS_PATH.LOGIN}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          if (!response.ok) return null;

          const resJson: IResponseModel<ILoginResponseModel> = await response.json();

          if (resJson.status === 0 && resJson.data) {
            return {
              id: credentials.username,
              email: credentials.username,
              accessToken: resJson.data.accessToken,
              refreshToken: resJson.data.refreshToken,
            };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Login sayfan
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.refreshToken) {
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
