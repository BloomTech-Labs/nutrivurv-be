import getUserId from "../utils/getUserId";

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          }
        ]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.user({
      where: {
        id: userId
      }
    });
  },
  myProfile(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.profile({
      where: {
        user_id: userId
      }
    });
  },
  myDailyRecords(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.dailyRecords({
      where: {
        user_id: userId
      }
    });
  },
  user(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      return prisma.query.user({
        where: {
          id: args.id
        }
      });
    } else {
      throw new Error("Can't find user");
    }
  },
  myRecipes(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      return prisma.query.customRecipes({
        where: {
          user_id: userId
        }
      });
    } else {
      return null;
    }
  }
};

export { Query as default };
