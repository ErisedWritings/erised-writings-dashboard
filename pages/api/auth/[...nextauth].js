import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        if (
          credentials.username === "Erised Writings" &&
          credentials.password === "strongPassword"
        ) {
          return {
            id: "2",
            name: "Erised Writings",
            email: "erisedwritings@gmail.com",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: "strongPassword",
  jwt: {
    secret: "strongPassword",
    encryption: true,
  },
};

export default NextAuth(authOptions);
