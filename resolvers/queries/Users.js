const Users = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.users(opArgs, info);
  },
  me(parent, args, { prisma, request }, info) {
    return prisma.query.user({
      where: {
        id: request.user_id,
      },
    });
  },
  user(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      return prisma.query.user({
        where: {
          id: args.id,
        },
      });
    } else {
      throw new Error("Can't find user");
    }
  },
};

export default Users;
