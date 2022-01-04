import { NextFunction, Request, Response } from 'express';

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const allowedDomains = ['http://localhost:4200', 'https://testprototype.ir', 'https://www.testprototype.ir'];
  if (allowedDomains.indexOf(req.headers.origin) !== -1) {
    const index: number = allowedDomains.indexOf(req.headers.origin);

    res.header('Access-Control-Allow-Origin', allowedDomains[index]);
  }

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Allow-Headers, Authorization, observe, enctype, Content-Length, X-Csrf-Token',
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '3600');

  if (req.url.search('public') == -1) {
    res.header('content-type', 'application/json; charset=utf-8');
  }

  const method = req.method;
  if (method == 'OPTIONS') {
    // res.header("HTTP/1.1 200 OK CORS");
    return res.status(200).json({});
  }
  next();
};

export default corsMiddleware;
