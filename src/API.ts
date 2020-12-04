import { Router } from 'express';
import bodyParser from 'body-parser';
import ApplicationAPI from './utils/ApplicationAPI';
import DeleteUserRouter from './routers/DeleteUserRouter';
import DocsRouter from './routers/DocsRouter';
import GetGroupsRouter from './routers/GetGroupsRouter';
import GetCornellMajorsRouter from './routers/GetCornellMajorsRouter';
import GetInterestsRouter from './routers/GetInterestsRouter';
import GetUserRouter from './routers/GetUserRouter';
import GetUsersRouter from './routers/GetUsersRouter';
import HelloRouter from './routers/HelloRouter';
import InitializeDevSessionRouter from './routers/InitializeDevSessionRouter';
import InitializeSessionRouter from './routers/InitializeSessionRouter';
import RefreshSessionRouter from './routers/RefreshSessionRouter';
import SearchUsersRouter from './routers/SearchUsersRouter';
import UpdateAvailabilitiesRouter from './routers/UpdateAvailabilitiesRouter';
import UpdateDemographicsRouter from './routers/UpdateDemographicsRouter';
import UpdateInterestsRouter from './routers/UpdateInterestsRouter';
import UpdateGroupsRouter from './routers/UpdateGroupsRouter';
import UpdateSocialMediaRouter from './routers/UpdateSocialMediaRouter';
import UpdateGoalsRouter from './routers/UpdateGoalsRouter';
import UpdateTalkingPointsRouter from './routers/UpdateTalkingPointsRouter';
import CreateDevMatchRouter from './routers/CreateDevMatchRouter';
import GetMatchHistoryRouter from './routers/GetMatchHistoryRouter';
import UpdateMatchAvailabilitiesRouter from './routers/UpdateMatchAvailabilitiesRouter';
import CancelMatchRouter from './routers/CancelMatchRouter';

class API extends ApplicationAPI {
  getPath(): string {
    return '/api/';
  }

  middleware(): any[] {
    return [bodyParser.json()];
  }

  versions() {
    return { v1: this.routerGroups() };
  }

  routerGroups(): { [index: string]: Router[] } {
    return {
      auth: [InitializeSessionRouter],
      dev: [CreateDevMatchRouter, InitializeDevSessionRouter],
      docs: [DocsRouter],
      general: [HelloRouter],
      group: [GetGroupsRouter],
      interest: [GetInterestsRouter],
      match: [CancelMatchRouter, GetMatchHistoryRouter, UpdateMatchAvailabilitiesRouter],
      major: [GetCornellMajorsRouter],
      refresh: [RefreshSessionRouter],
      user: [
        DeleteUserRouter,
        GetUserRouter,
        GetUsersRouter,
        SearchUsersRouter,
        UpdateAvailabilitiesRouter,
        UpdateDemographicsRouter,
        UpdateInterestsRouter,
        UpdateGoalsRouter,
        UpdateGroupsRouter,
        UpdateSocialMediaRouter,
        UpdateTalkingPointsRouter,
      ],
    };
  }
}

export default API;
