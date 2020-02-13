import getUserId from "../utils/getUserId";

const User = {
  email: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false);

      if (userId && userId === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    }
  },
  profile: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, { prisma, request }, info) {
      const userId = getUserId(request, false);

      if (userId) {
        return prisma.query.profile({
          where: {
            user_id: parent.id
          }
        });
      } else {
        return null;
      }
    }
  },
  dailyRecords: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, { prisma, request }, info) {
      const userId = getUserId(request, false);
      if (userId && userId == parent.id) {
        return prisma.query.dailyRecords({
          where: {
            user_id: parent.id
          }
        });
      } else {
        return null;
      }
    }
  }
};

export { User as default };
