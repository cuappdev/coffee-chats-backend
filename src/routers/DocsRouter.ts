import { Request } from 'express';
import ApplicationRouter from '../utils/ApplicationRouter';
import * as swaggerUI from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';

class DocsRouter extends ApplicationRouter<any> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/';
  }

  middleware() {
    return [swaggerUI.serve, swaggerUI.setup(swaggerDocument)];
  }

  async content(req: Request): Promise<void> {}
}

export default new DocsRouter().router;