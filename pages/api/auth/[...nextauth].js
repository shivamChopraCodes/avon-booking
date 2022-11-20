import NextAuth from 'next-auth';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
let userAccount = null;

const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');

const confirmPasswordHash = async (plainPassword, hashedPassword) => {
  console.log(plainPassword, hashedPassword, await bcrypt.hashSync('123456', 10));
  return await bcrypt.compareSync(plainPassword, hashedPassword);
};

const fetchUser = async (email, type) => {
  if (type === 'staff') {
    return await prisma.signupstaff.findFirst({
      where: {
        email: email,
        showhidden: 'Show',
        blockunblock: 'Unblock',
      },
    });
  } else {
    return await prisma.signupagent.findFirst({
      where: {
        email: email,
        showhidden: 'Show',
      },
    });
  }
};

const configuration = {
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
  },
  session: {
    strategy: 'jwt',
    jwt: true,
    maxAge: 30 * 60,
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await fetchUser(credentials.email, credentials.userType);
          if (user !== null) {
            //Compare the hash
            const res = await confirmPasswordHash(credentials.password, user.password);
            console.log('res', res);

            if (res === true) {
              userAccount =
                credentials.userType === 'staff'
                  ? {
                      userId: user.idsignupstaff,
                      userName: user.username,
                      userType: user.adminstaffagent,
                    }
                  : {
                      userId: user.idsignupagent,
                      userName: user.username,
                      email: user.email,
                      status: user.status,
                      userType: user.adminstaffagent,
                    };
              return userAccount;
            } else {
              throw new Error(JSON.stringify({ errors: user.errors, status: false }));
            }
          } else {
            throw new Error(JSON.stringify({ errors: user.errors, status: false }));
          }
        } catch (err) {
          console.log('Authorize error:', err);
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      try {
        //the user object is wrapped in another user object so extract it
        user = user.user;
        console.log('Sign in callback', user);
        console.log('User id: ', user.userId);
        if (typeof user.userId !== typeof undefined) {
          if (user.status.toLowerCase() === 'verified') {
            console.log('User is active');
            console.log(user);
            return user;
          } else {
            console.log('User is not active');
            return false;
          }
        } else {
          console.log('User id was undefined');
          return false;
        }
      } catch (err) {
        console.error('Signin callback error:', err);
      }
    },
    async session({ session, token, user }) {
      console.log('session85', { session, token, user, userAccount });
      if (userAccount !== null) {
        //session.user = userAccount;
        session.user = {
          ...(token.user || {}),
        };
      } else if (
        typeof token.user !== typeof undefined &&
        (typeof session.user === typeof undefined ||
          (typeof session.user !== typeof undefined && typeof session.user.userId === typeof undefined))
      ) {
        session.user = token.user;
      } else if (typeof token !== typeof undefined) {
        session.token = token;
      }
      console.log('session 86', session);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('JWT callback. Got User: ', token, user);
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: '/signin',
  },
};
export default (req, res) => NextAuth(req, res, configuration);
