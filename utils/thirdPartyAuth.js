const axios = require('axios');

function ThirdPartyAuth(token) {
  return axios
    .get(`${process.env.AUTH0_DOMAIN}userinfo`, {
      headers: { Authorization: `${token}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error('ThirdPartyAuth Userinfo Failed', err);
    });
}

module.exports = ThirdPartyAuth;
