const axios = require('axios')
const FormData = require('form-data');
const cookies = require('./cookies')
const users = require('../users')

function auth (user) {
  let passwd = users[user]
  console.log('Getting modhash and cookies for ', user)

  const data = new FormData();
  data.append('op', 'login');
  data.append('user', user);
  data.append('passwd', passwd);
  data.append('api_type', 'json');

  const config = {
    method: 'post',
    url: 'https://www.reddit.com/api/login',
    headers: {
      ...data.getHeaders()
    },
    data : data
  };

  return axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    if (response.data.json.data) {
      let modhash = response.data.json.data.modhash
      let cookie = response.headers['set-cookie'].map((c) => c.split(';')[0]).join('; ')
      cookies.set(user, cookie, modhash)
    } else {
      let msg = response.data.json.errors[0][0]
      if (msg === 'INCORRECT_USERNAME_PASSWORD') {
        console.log('Invalid user name or password for:'.yellow, user, passwd)
        cookies.set(user, false, false)
      } else {
        console.log(response.data.json)
      }
    }
  })
}

function ensureAuth (usersNames = Object.keys(users)) {
  let promises = []
  usersNames.forEach((user) => {
    if (!cookies.get(user)) {
      promises.push(auth(user))
    }
  })
  return Promise.all(promises)
}

module.exports = {
  auth: auth,
  ensureAuth: ensureAuth,
  isAuth: (user) => !!cookies.get(user),
  cookie: (user) => cookies.get(user) && cookies.get(user).cookie,
  modhash: (user) => cookies.get(user) && cookies.get(user).modhash,
  invalidate: (user) => cookies.del(user)
}
