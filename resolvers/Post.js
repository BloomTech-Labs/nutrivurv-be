const Post = {
  comments: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma, request }, info) {
      if (request.user_id) {
        return prisma.query.comments({
          where: {
            post: {
              id: parent.id,
            },
          },
        });
      } else {
        return null;
      }
    },
  },
  user: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma, request }, info) {
      if (request.user_id) {
        return prisma.query.user({
          where: {
            id: parent.user.id,
          },
        });
      }
    },
  },
};

export { Post as default };
