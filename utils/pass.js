'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

// fake database: ****************
const users = [
  {
    user_id: 1,
    name: 'Foo Bar',
    email: 'foo@bar.fi',
    password: 'foobar',
  },
  {
    user_id: 2,
    name: 'Bar Foo',
    email: 'bar@foo.fi',
    password: 'barfoo',
  },
];
// *******************

// fake database functions *********
const getUser = (id) => {
  const user = users.filter((usr) => {
    if (usr.user_id === id) {
      return usr;
    }
  });
  return user[0];
};

const getUserLogin = (email) => {
  const user = users.filter((usr) => {
    if (usr.email === email) {
      return usr;
    }
  });
  return user[0];
};
// *****************

// serialize: store user id in session
passport.serializeUser((id, done) => {
  console.log('serialize', id);
  // serialize user id by adding it to 'done()' callback
  done(null, id);
});

// deserialize: get user id from session and get all user data
passport.deserializeUser(async (id, done) => {
  // get user data by id from getUser
  const user = getUser(id);
  console.log('deserialize', user);
  // deserialize user by adding it to 'done()' callback
  done(null, user);
});

passport.use(new Strategy(
    (username, password, done) => {
      // get user by username from getUserLogin
      const user = getUserLogin(username);
      if (user === undefined) {
        return done(null, false);
      }
      // if user is undefined
      if(password !== user.password) {
        return done(null, false);
      }
      // return done(null, false);
      // if passwords dont match
      // return done(null, false);
      // if all is ok
      return done(null, user.user_id);
      // return done(null, user.user_id);
    }
));

module.exports = passport;