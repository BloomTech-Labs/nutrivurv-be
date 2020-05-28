const hashPassword = require('../utils/hashPassword.js');
const validateLogin = require('../utils/validateLogin.js');
const getUserId = require('../utils/getUserId.js');
const jwt = require('jsonwebtoken');

describe('utility test cases', () => {
  test('hashPassword hashes the password', async () => {
    const password = 'secure12';
    const hash = await hashPassword(password);

    expect(password).not.toBe(hash);
  });

  test('hashPassword does not allow pw < 8 char', async () => {
    const short = 'short';
    try {
      const invalid = hashPassword(short);
    } catch (error) {
      expect(error).toEqual(
        new Error(
          'Password must be greater than 8 characters and less than 16 characters'
        )
      );
    }
  });

  test('hashPassword does not allow pw > 16 char', async () => {
    const long = 'omgthispasswordiswaytoolong';
    try {
      const alsobad = hashPassword(long);
    } catch (error) {
      expect(error).toEqual(
        new Error(
          'Password must be greater than 8 characters and less than 16 characters'
        )
      );
    }
  });

  test('login will not work with no user', async () => {
    try {
      validateLogin('testing123');
    } catch (error) {
      expect(error).toEqual(new Error('Unable to login'));
    }
  });

  test('login will not work with mismatched passwords', async () => {
    const user = {
      password: 'testing123',
    };
    try {
      validateLogin('testing13', user);
    } catch (error) {
      expect(error).toEqual(new Error('Unable to login'));
    }
  });

  test('getuserid allows login route', async () => {
    const login = {
      request: {
        request: {
          headers: {
            authorization: 'token',
          },
          body: {
            query: 'login',
          },
        },
      },
    };

    const loggedIn = await getUserId(
      () => {
        return 'yay';
      },
      null,
      null,
      login
    );

    expect(loggedIn).toBe('yay');
  });

  test('getuserid allows createuser route', async () => {
    const login = {
      request: {
        request: {
          headers: {
            authorization: 'token',
          },
          body: {
            query: 'createUser',
          },
        },
      },
    };

    const loggedIn = await getUserId(
      () => {
        return 'yay';
      },
      null,
      null,
      login
    );

    expect(loggedIn).toBe('yay');
  });
});
