import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const userEmails = ['misha.chumak9@gmail.com']

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
}

export default NextAuth(authOptions)

export async function isUserRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!userEmails. includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw 'not an user';
  }
}