const User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { request }, info) {
      if (request.user_id && request.user_id === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    },
  },
  profile: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma, request }, info) {
      if (request.user_id) {
        return prisma.query.profile({
          where: {
            user_id: parent.id,
          },
        });
      } else {
        return null;
      }
    },
  },
  dailyRecords: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma, request }, info) {
      if (request.user_id && request.user_id == parent.id) {
        return prisma.query.dailyRecords({
          where: {
            user_id: parent.id,
          },
        });
      } else {
        return null;
      }
    },
  },
  favorites: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma, request }, info) {
      if (request.user_id) {
        return prisma.query.favoriteFoods({
          where: {
            user_id: parent.id,
          },
        });
      } else {
        return null;
      }
    },
  },
  weightLogs: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma, request }, info) {
      if (request.user_id) {
        return prisma.query.weightLogs({
          where: {
            user_id: parent.id,
          },
        });
      } else {
        return null;
      }
    },
  },
};

export { User as default };
