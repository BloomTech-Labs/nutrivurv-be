const Profile = {
  async deleteProfile(parent, args, { prisma, request }, info) {
    return prisma.mutation.deleteProfile(
      { where: { user_id: request.user_id } },
      info
    );
  },
  async updateProfile(parent, args, { prisma, request }, info) {
    return prisma.mutation.updateProfile(
      {
        where: {
          user_id: request.user_id,
        },
        data: args.data,
      },
      info
    );
  },
  async createProfile(parent, args, { prisma, request }, info) {
    return prisma.mutation.createProfile(
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

export default Profile;
