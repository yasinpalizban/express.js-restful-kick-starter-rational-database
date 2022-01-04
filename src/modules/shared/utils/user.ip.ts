import { Request } from 'express';

export function userIp(req: Request): string {
  let ip: string;

  if (req.headers['x-forwarded-for']) {
    // ip = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.connection && req.connection.remoteAddress) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.ip;
  }
  return ip;
}
