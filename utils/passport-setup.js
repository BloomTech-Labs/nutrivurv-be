const passport = require('passport')
    ,LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(parent, args, { prisma }, info, done){
        prisma.query.user({email: args.email}, function(err, user){
            if(err) {return done(err);}
            if(!user){
                return done (null, false, {message: 'Email not found'})
            }
            if(!user.validPassword(args.password)) { return done(null, false); }
            return done(null, user)
        })
    }
))