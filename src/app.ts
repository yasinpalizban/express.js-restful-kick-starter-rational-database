import { AppInterface } from '@/core/interfaces/app.interface';

process.env['NODE_CONFIG_DIR'] = __dirname + '/core/configs';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import DB from './core/databases/database';
import { Routes } from './core/interfaces/routes.interface';
import errorMiddleware from './core/middlewares/error.middleware';
import { logger, stream } from './core/utils/logger';
import path from 'path';
import corsMiddleware from '@/modules/common/middlewares/cors.middleware';
import urlMiddleware from '@/modules/common/middlewares/url.middleware';
import contentNegotiationMiddleware from '@/modules/common/middlewares/content.negotiation.middleware';
import dataInputMiddleware from '@/modules/common/middlewares/data.input.middleware';
import userAgent from 'express-useragent';
import i18nMiddleware from 'i18next-express-middleware';
import { default as i18n } from 'i18next';
import Backend from 'i18next-node-fs-backend';
import { LanguageDetector } from 'i18next-express-middleware';

class App implements AppInterface {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.connectToDatabase();
    this.initializeI18n();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    DB.sequelize.sync({ force: false });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(userAgent.express());

    this.app.use('/public', express.static(path.join(__dirname, '../public')));
    this.app.use(corsMiddleware);
    this.app.use(urlMiddleware);
    this.app.use(contentNegotiationMiddleware);
    this.app.use(dataInputMiddleware);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }
  private initializeI18n(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    i18n
      .use(Backend)
      .use(LanguageDetector)
      .init({
        lng: 'en',
        whitelist: ['en', 'fa'],
        fallbackLng: 'en',
        // have a common namespace used around the full app
        ns: ['translation'],
        debug: false,
        backend: {
          loadPath: path.join(__dirname + '/locales/{{lng}}/{{ns}}.json'),
          // jsonIndent: 2
        },
        preload: ['en', 'fa'],
      });
    this.app.use(i18nMiddleware.handle(i18n));
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
