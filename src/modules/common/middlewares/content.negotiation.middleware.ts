import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { default as i18n } from 'i18next';
import { ErrorType } from '../../auth/enums/error.type.enum';
import { LanguageType } from '../../shared/enum/language.enum';

const contentNegotiationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const lang: string | boolean = req.acceptsLanguages(LanguageType.En, LanguageType.Fa);
  const char: string | boolean = req.acceptsCharsets('utf-8');
  const encode: string | boolean = req.acceptsEncodings('gzip');

  //  if (lang == false) {
  // res.status(StatusCodes.UNAUTHORIZED).json({
  //   error: i18n.t("middleWear.contentLang"),
  //   type: ErrorType.content
  // });
  // }

  // if (char == false) {
  //   res.status(StatusCodes.UNAUTHORIZED).json({
  //     error: i18n.t("middleWear.contentChar"),
  //     type: ErrorType.content
  //   });
  // }

  //if ( encode==  false) {
  //   res.status(StatusCodes.UNAUTHORIZED).json({
  //     error: i18n.t("middleWear.contentEncode"),
  //     type: ErrorType.content
  //   });
  // }
  //
  // switch (req.accepts(["json", "html"])) {
  //   case "json":
  //     res.setHeader("Content-Type", "application/json");
  //     res.write(JSON.stringify({ hello: "world"));
  //     break;
  //   case "html":
  //     res.setHeader("Content-Type", "text/html");
  //     res.write("<b>hello, world</b>");
  //     break;
  //   default:
  //     res.setHeader("Content-Type", "text/plain");
  //     res.write("hello, world");
  //     break;
  // }
  next();
};

export default contentNegotiationMiddleware;
