const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3001',
  'http://localhost:3001',
  'https://domainname.chisvin.nomoredomains.xyz',
  'http://domainname.chisvin.nomoredomains.xyz',
  'https://api.domainname.chisvin.nomoredomains.xyz',
  'https://api.domainname.chisvin.nomoredomains.xyz',
];

function cors(req, res, next) {
  const { origin } = req.headers;
  console.log(origin);
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
  return null;
}

module.exports = { cors };
