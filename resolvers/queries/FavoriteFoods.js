const FavoriteFoods = {
  myFavoriteFoods(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      return prisma.query.favoriteFoods({
        where: {
          user_id: request.user_id,
        },
      });
    } else {
      return null;
    }
  },
};

export default FavoriteFoods;
