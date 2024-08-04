// import { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import bcrypt from 'bcryptjs';
// import prisma from '@/lib/db';

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       id: 'credentials',
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials) {
//           throw new Error('No credentials provided');
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) {
//           throw new Error('User not found');
//         }

//         if (!user.emailVerified) {
//           throw new Error('User is not verified');
//         }

//         const isPasswordCorrect = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isPasswordCorrect) {
//           throw new Error('Password is incorrect');
//         }

//         return user;
//       },
//     }),
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID as string,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     // }),
//   ],
//   pages: {
//     signIn: '/signin',
//   },
//   session: {
//     strategy: 'jwt',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token._id = user.id?.toString();
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         // session.user._id = token._id;
//       }
//       return session;
//     },
//   },
// };

// export default authOptions;
