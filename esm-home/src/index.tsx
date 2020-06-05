import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { PiletApi } from '@openmrs/app-shell';

const Home = React.lazy(() => import('./Home'));
const PatientSearch = React.lazy(() => import('./Search'));

export function setup(app: PiletApi) {
  app.defineConfigSchema(
    {
      buttons: {
        enabled: {},
      },
    },
    {
      buttons: {
        enabled: true,
      },
    },
  );

  app.registerPage('/', () => <Redirect to="/home" />);
  app.registerPage('/home', Home);
  app.registerPage('/patient-search', PatientSearch);
}
