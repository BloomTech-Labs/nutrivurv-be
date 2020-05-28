const CustomIngredient = {
  async createCustomIngredient(parent, args, { prisma, request }, info) {
    return prisma.mutation.createCustomIngredient(
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
  async deleteCustomIngredient(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      const ingredientExists = await prisma.query.customIngredients({
        where: {
          id: args.id,
        },
      });
      if (ingredientExists[0].user_id == request.user_id) {
        return prisma.mutation.deleteCustomIngredient(
          {
            where: {
              id: args.id,
            },
          },
          info
        );
      } else {
        throw new Error("Can't find Ingredient with that ID");
      }
    } else {
      throw new Error("Can't find Ingredient with that ID");
    }
  },
  async updateCustomIngredient(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      const ingredientExists = await prisma.query.customIngredients({
        where: {
          id: args.id,
        },
      });
      if (ingredientExists[0].user_id == request.user_id) {
        return prisma.mutation.updateCustomIngredient(
          {
            where: {
              id: args.id,
            },
            data: args.data,
          },
          info
        );
      } else {
        throw new Error("Can't find Ingredient with that ID");
      }
    } else {
      throw new Error("Can't find Ingredient with that ID");
    }
  },
};

export default CustomIngredient;
