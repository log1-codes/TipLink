import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma"

import { createNewKmsWallet } from "@/lib/wallet";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email || !account?.providerAccountId) return false;

      const googleSub = account.providerAccountId; // Google's unique user ID

      const existing = await prisma.user.findUnique({
        where: { googleSub },
      });

      if (!existing) {
        // Generate a new KMS-encrypted wallet
        const { publicKey, encryptedPrivateKey } = await createNewKmsWallet();

        await prisma.user.create({
          data: {
            email: user.email,
            googleSub,
            name: user.name,
            image: user.image,
            publicKey,
            encryptedPrivateKey,
          },
        });
      }

      return true;
    },

    async session({ session, token }) {
      if (!session.user?.email) return session;

      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (dbUser) {
        (session.user as any).publicKey = dbUser.publicKey;
        (session.user as any).googleSub = dbUser.googleSub;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };