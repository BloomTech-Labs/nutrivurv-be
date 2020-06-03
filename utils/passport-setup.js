const passport = require('passport');
const { GraphQLLocalStrategy } = require("graphql-passport");

passport.use(
  new GraphQLLocalStrategy((parent, {email, password}, { prisma }, info, done) => {
    try {
      const users = await prisma.query.users();
      const matchingUser = users.find(user => email === user.email && password === user.password);
      const error = matchingUser ? null: new Error('no matching user');
      return done(error, matchingUser);
    }
   catch (error) {
    return done(error);
  }
    console.log(user);
    return done(null, user);
  })
);
