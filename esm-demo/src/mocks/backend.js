const request = require('request');

const host = 'https://openmrs-spa.org/openmrs';

module.exports = function (_, req, res) {
  if (req.url.startsWith('/openmrs/')) {
    const path = req.url.substr(9);
    const target = `${host}/${path}`;

    return new Promise((resolve) => {
      request(
        {
          url: target,
          method: req.method,
          headers: {
            ...req.headers,
            'Accept-Encoding': '',
          },
          rejectUnauthorized: false,
          insecure: true,
        },
        (err, ans, content) => {
          if (!err) {
            resolve(
              res({
                headers: ans.headers,
                content,
              }),
            );
          } else {
            resolve();
          }
        },
      );
    });
  }
};
