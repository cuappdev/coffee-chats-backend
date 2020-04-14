import { Request } from 'express';
import { SerializedUser } from '../common/types';
import UserRepo from '../repos/UserRepo';
import ApplicationRouter from '../appdev/ApplicationRouter';

class GetUserRouter extends ApplicationRouter<SerializedUser> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/user/';
  }

  async content(req: Request): Promise<SerializedUser> {
    const { netID } = req.query;
    const user = await UserRepo.getUserByNetID(netID);
    return user.serialize();
  }
}

export default new GetUserRouter().router;
