import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/app/utils/db';
import User from '@/app/models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        await dbConnect();
        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
          return { id: user._id, email: user.email };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

export function GET(req, res) {
  return NextAuth(req, res, authOptions);
}

export function POST(req, res) {
  return NextAuth(req, res, authOptions);
}
