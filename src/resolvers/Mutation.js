import bcrypt from "bcryptjs";
import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    });

    return {
      user,
      token: generateToken(user.id)
    };
  },
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    });

    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login");
    }

    return {
      user,
      token: generateToken(user.id)
    };
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId
        }
      },
      info
    );
  },
  async deleteProfile(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteProfile({ where: { user_id: userId } }, info);
  },
  async deleteDailyRecord(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      const recordExists = await prisma.query.dailyRecords({
        where: {
          id: args.id
        }
      });
      if (recordExists[0].user_id == userId) {
        return prisma.mutation.deleteDailyRecord(
          {
            where: {
              id: args.id
            },
            data: args.data
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
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof args.data.password === "string") {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: args.data
      },
      info
    );
  },
  async updateProfile(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.updateProfile(
      {
        where: {
          user_id: userId
        },
        data: args.data
      },
      info
    );
  },
  async updateDailyRecord(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      const recordExists = await prisma.query.dailyRecords({
        where: {
          id: args.id
        }
      });
      if (recordExists[0].user_id == userId) {
        return prisma.mutation.updateDailyRecord(
          {
            where: {
              id: args.id
            },
            data: args.data
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
  async createProfile(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.createProfile(
      {
        data: {
          ...args.data,
          user_id: userId,
          user: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
  },
  async createDailyRecord(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.createDailyRecord(
      {
        data: {
          ...args.data,
          user_id: userId,
          user: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
  }
};

export { Mutation as default };
