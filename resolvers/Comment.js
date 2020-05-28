const Comment = {
  post: {
    fragment: 'fragment postId on Post { id }',
    resolve(parent, args, { prisma, request }, info) {
      if (request.user_id) {
        const postid = parent.post ? parent.post.id : parent.post_id;
        return prisma.query.post({
          where: {
            id: postid,
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
        const user = parent.user ? parent.user.id : parent.user_id;
        return prisma.query.user({
          where: {
            id: user,
          },
        });
      }
    },
  },
};

export { Comment as default };
