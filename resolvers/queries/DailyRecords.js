const formatDate = require('../../utils/formatDate.js');

const DailyRecords = {
  myDailyRecords(parent, args, { prisma, request }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: { user_id: request.user_id },
    };

    return prisma.query.dailyRecords(opArgs, info);
  },
  async myDailyRecordCount(parent, args, { prisma, request }, info) {
    const count = await prisma.query.dailyRecords({
      where: {
        user_id: request.user_id,
      },
    });

    if (count && count.length > 0) {
      return count.length;
    } else {
      return 0;
    }
  },
  async todaysRecords(parent, args, { prisma, request }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: { user_id: request.user_id },
    };

    const today = formatDate(Date.now());
    const records = await prisma.query.dailyRecords(opArgs);

    return records.filter((cv) => {
      return cv.date.includes(today);
    });
  },
};
export default DailyRecords;
