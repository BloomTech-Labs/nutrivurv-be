const WeightLogs = {
  async createWeightLog(parent, args, { prisma, request }, info) {
    return prisma.mutation.createWeightLog(
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
  async updateWeightLog(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      const weightLogExists = await prisma.query.weightLog({
        where: {
          id: args.id,
        },
      });
      if (weightLogExists.user_id == request.user_id) {
        return prisma.mutation.updateWeightLog(
          {
            where: {
              id: args.id,
            },
            data: args.data,
          },
          info
        );
      } else {
        throw new Error("Can't find WeightLog with that ID");
      }
    } else {
      throw new Error("Can't find WeightLog with that ID");
    }
  },
  async deleteWeightLog(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      const weightLogExists = await prisma.query.weightLog({
        where: {
          id: args.id,
        },
      });
      if (weightLogExists.user_id == request.user_id) {
        return prisma.mutation.deleteWeightLog(
          {
            where: {
              id: args.id,
            },
          },
          info
        );
      } else {
        throw new Error("Can't find WeightLog with that ID");
      }
    } else {
      throw new Error("Can't find WeightLog with that ID");
    }
  },
};

export default WeightLogs;
