const jwt = require('jsonwebtoken');

const isLoggedIn = async (resolve, parent, args, ctx, info) => {
  const permit = () => {
    if (ctx.request.request) {
      if (ctx.request.request.headers) {
        if (ctx.request.request.headers.authorization) {
          return ctx.request.request.headers.authorization;
        } else if (
          ctx.request.request.headers.cookie &&
          ctx.request.request.headers.cookie.includes('token=')
        ) {
          return ctx.request.request.headers.cookie
            .split('; ')
            .filter((cv) => {
              return cv.includes('token');
            })[0]
            .split('=')[1];
        }
      }
    } else if (ctx.request.connection) {
      if (ctx.request.connection.context) {
        if (ctx.request.connection.context.Authorization) {
          return ctx.request.connection.context.Authorization;
        }
      }
    }
  };

  if (ctx.request.request) {
    if (
      ctx.request.request.body.query.includes('login') ||
      ctx.request.request.body.query.includes('createUser')
    ) {
      return resolve();
    }
  }

  if (!permit()) {
    throw new Error(`Not authorised!`);
  }

  const token = permit().replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded || !decoded.userId) {
    throw new Error(`Not authorised!`);
  }
  ctx.request.user_id = decoded.userId;
  return resolve();
};

module.exports = isLoggedIn;
