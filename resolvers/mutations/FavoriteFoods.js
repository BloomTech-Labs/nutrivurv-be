const FavoriteFoods = {
  async deleteFavoriteFood(parent, args, { prisma, request }, info) {
    const recordExists = prisma.exists.FavoriteFood({
      id: args.id,
    });
    if (!recordExists) {
      throw new Error("Can't find record with that ID");
    }
    return prisma.mutation.deleteFavoriteFood(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
  async updateFavoriteFood(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      const recordExists = await prisma.query.favoriteFoods({
        where: {
          id: args.id,
        },
      });
      if (recordExists[0].user_id == request.user_id) {
        return prisma.mutation.updateFavoriteFood(
          {
            where: {
              id: args.id,
            },
            data: args.data,
          },
          info
        );
      } else {
        throw new Error("Can't find record with that ID");
      }
    } else {
      throw new Error("Can't find record with that ID");
    }
  },
  async createFavoriteFood(parent, args, { prisma, request }, info) {
    return prisma.mutation.createFavoriteFood(
      {
        data: {
          ...args.data,
          user_id: request.user_id,
          user: {
            connect: {
              id: request.user_id,
            },
          },
        },
      },
      info
    );
  },
};

export default FavoriteFoods;
