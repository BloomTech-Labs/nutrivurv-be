import generateToken from '../../utils/generateToken.js';
import hashPassword from '../../utils/hashPassword.js';
import validateLogin from '../../utils/validateLogin.js';

const User = {
  async createUser(parent, args, { request, prisma }, info) {
    const password = await hashPassword(args.data.password);

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
    const user = await prisma.query.user({
      where: {
        email: args.data.email,
      },
    });

    return validateLogin(args.data.password, user);
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
