import thirdPartyAuth from '../../utils/thirdPartyAuth.js';

import generateToken from '../../utils/generateToken.js';
import hashPassword from '../../utils/hashPassword.js';
import validateLogin from '../../utils/validateLogin.js';

const User = {
  async createUser(parent, args, { request, prisma }, info) {
    const auth0Token = request.request.headers.auth0;

    const auth0User = auth0Token
      ? await thirdPartyAuth(request.request.headers.auth0)
      : '';

    args.data = auth0User
      ? {
          name: auth0User.nickname,
          email: auth0User.name,
        }
      : args.data;

    const password = await hashPassword(
      auth0User ? auth0User.sub : args.data.password
    );

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
      },
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },
  async login(parent, args, { request, prisma }, info) {
    const auth0Token = request.request.headers.auth0;

    const auth0User = auth0Token
      ? await thirdPartyAuth(request.request.headers.auth0)
      : '';

    const user = await prisma.query.user({
      where: {
        email: auth0User ? auth0User.name : args.data.email,
      },
    });

    return validateLogin(auth0User ? auth0User.sub : args.data.password, user);
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    return prisma.mutation.deleteUser(
      {
        where: {
          id: request.user_id,
        },
      },
      info
    );
  },
  async updateUser(parent, args, { prisma, request }, info) {
    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: {
          id: request.user_id,
        },
        data: args.data,
      },
      info
    );
  },
};

export default User;
