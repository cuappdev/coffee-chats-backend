import { Request } from 'express';
import { SerializedUser } from '../common/types';
import ApplicationRouter from '../utils/ApplicationRouter';
import Authenticate from '../utils/Authenticate';
import UserRepo from '../repos/UserRepo';

class GetUserRouter extends ApplicationRouter<SerializedUser> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/';
  }
   
  middleware() {
    return [Authenticate.ensureAuthenticated];
  }

  async content(req: Request): Promise<SerializedUser> {
    const { netID } = req.query;
    const user = await UserRepo.getUserByNetID(netID);
    return user.serialize();
  }
}

export default new GetUserRouter().router;
