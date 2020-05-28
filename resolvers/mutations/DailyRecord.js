const DailyRecord = {
  async deleteDailyRecord(parent, args, { prisma, request }, info) {
    const recordExists = prisma.exists.DailyRecord({
      id: args.id,
    });
    if (!recordExists) {
      throw new Error("Can't find record with that ID");
    }
    return prisma.mutation.deleteDailyRecord(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },

  async updateDailyRecord(parent, args, { prisma, request }, info) {
    if (request.user_id) {
      const recordExists = await prisma.query.dailyRecords({
        where: {
          id: args.id,
        },
      });
      if (recordExists[0].user_id == request.user_id) {
        return prisma.mutation.updateDailyRecord(
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

  async createDailyRecord(parent, args, { prisma, request }, info) {
    return prisma.mutation.createDailyRecord(
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

export default DailyRecord;
