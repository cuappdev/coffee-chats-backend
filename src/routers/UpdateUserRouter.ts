import { Request } from 'express';
import ApplicationRouter from '../appdev/ApplicationRouter';
import UserRepo from '../repos/UserRepo';

class UpdateUserRouter extends ApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/user/update/';
  }

  async content(req: Request): Promise<void> {
    const { accessToken, firstName, lastName, netID } = req.body;
    await UserRepo.updateUser(accessToken, firstName, lastName, netID);
  }
}

export default new UpdateUserRouter().router;
