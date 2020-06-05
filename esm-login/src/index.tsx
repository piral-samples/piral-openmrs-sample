import * as React from 'react';
import { PiletApi } from '@openmrs/app-shell';
import { Logout } from './Logout';

const Login = React.lazy(() => import('./Login'));

export function setup(app: PiletApi) {
  app.defineConfigSchema(
    {
      logo: {
        src: {
          description: 'A path or URL to an image.',
        },
        alt: {
          description: 'Alt text, shown on hover.',
        },
      },
    },
    {
      logo: {
        src: undefined,
        alt: undefined,
      },
    },
  );

  app.registerPage('/login', Login);
  app.registerMenu(Logout);
}
