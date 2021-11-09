import * as React from 'react';
import { PiralPlugin, useGlobalState } from 'piral-core';
import { userHasAccess } from './privileges';
import { PiralSessionApi, PiralConfigApi, PiralCheckerApi } from './types';

export function createSessionApi(): PiralPlugin<PiralSessionApi> {
  return (ctx) => ({
    getSession() {
      return ctx.readState((s) => s.session);
    },
    setSession(session) {
      ctx.updateSession(session);
    },
  });
}

export function createConfigApi(): PiralPlugin<PiralConfigApi> {
  const readConfig = (name: string, defaultConfig: any) => {
    const key = `config-${name}`;
    const current = localStorage.getItem(key);

    if (typeof current === 'string') {
      try {
        return {
          ...defaultConfig,
          ...JSON.parse(current),
        };
      } catch {
        console.warn(`Invalid value in localStorage key found. Removing "${key}".`);
        localStorage.removeItem(key);
      }
    }

    return defaultConfig;
  };

  return (ctx) => (_, meta) => ({
    defineConfigSchema(schema, defaultConfig = {}) {
      const current = readConfig(meta.name, defaultConfig);

      ctx.dispatch((state) => ({
        ...state,
        configs: {
          ...state.configs,
          [meta.name]: {
            current,
            schema,
          },
        },
      }));
    },
    getCurrentConfig() {
      const cfg = ctx.readState((s) => s.configs[meta.name]);
      return cfg?.current ?? {};
    },
  });
}

export function createCheckerApi(): PiralPlugin<PiralCheckerApi> {
  return (ctx) => ({
    canAccess(privilege) {
      const user = ctx.readState((s) => s.session);
      return userHasAccess(privilege, user);
    },
    Restriction(props) {
      const user = useGlobalState((s) => s.session);

      if (userHasAccess(props.privilege, user)) {
        return <>{props.children}</>;
      }

      return null;
    },
  });
}
