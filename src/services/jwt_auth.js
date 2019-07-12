import { sign, verify } from 'jsonwebtoken';

const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';

const tokenService = () => {
  const issue = payload => sign(payload, secret, { expiresIn: 10800 });
  const authenticate = (token, cb) => verify(token, secret, {}, cb);

  return {
    issue,
    authenticate,
  };
};


const authService = (req, res, next) => {
  let tokenToVerify;
  // header format: "Authorization: Bearer [token]" or "token: [token]"
  if (req.header('Authorization')) {
    const parts = req.header('Authorization').split(' ');

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res.status(401).json({ msg: 'Format for Authorization: Bearer [token]' });
      }
    } else {
      return res.status(401).json({ msg: 'Format for Authorization: Bearer [token]' });
    }
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return res.status(401).json({ msg: 'No Authorization was found' });
  }

  return tokenService().authenticate(tokenToVerify, (err, thisToken) => {
    if (err) return res.status(401).json({ err });
    req.token = thisToken;
    return next();
  });
};


module.exports = {
  authService,
  tokenService,
};
