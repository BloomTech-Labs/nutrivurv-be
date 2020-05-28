const CustomRecipe = {
  ingredient_list: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma, request }, info) {
      return prisma.query.ingredientLists({
        where: {
          recipe_id: parent.id,
        },
      });
    },
  },
};

export { CustomRecipe as default };
