declare module 'piral-core/lib/types/custom' {
  interface PiletCustomApi extends PiralSessionApi, PiralConfigApi, PiralCheckerApi {}

  interface PiralCustomActions {
    updateSession(session: UserSession): void;
  }

  interface PiralCustomState {
    session: UserSession;
    configs: Record<
      string,
      {
        current: any;
        schema: any;
      }
    >;
  }
}

export interface PiralSessionApi {
  getSession(): UserSession;
  setSession(session: UserSession): void;
}

export interface PiralConfigApi {
  defineConfigSchema(schema: any, defaultConfig?: any): void;
  getCurrentConfig(): any;
}

export interface PiralCheckerApi {
  canAccess(privilege): boolean;
  Restriction: React.FC<RestrictionProps>;
}

export interface RestrictionProps {
  privilege: string;
}

export interface LinkEntity {
  rel: string;
  uri: string;
}

export interface PersonEntity {
  uuid: string;
  display: string;
  links: Array<LinkEntity>;
}

export interface UserSession {
  display: string;
  links: Array<LinkEntity>;
  person: PersonEntity;
  privileges: Array<string>;
  resourceVersion: string;
  retired: boolean;
  roles: Array<PersonEntity>;
  systemId: string;
  userProperties: {
    loginAttempts: string;
  };
  username: string;
  uuid: string;
}
