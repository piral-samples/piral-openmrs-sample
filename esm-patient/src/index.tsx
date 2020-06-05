import * as React from 'react';
import { Link } from 'react-router-dom';
import { PiletApi } from '@openmrs/app-shell';

const PatientResult = React.lazy(() => import('./SearchResult'));
const Patients = React.lazy(() => import('./Patients'));

export function setup(app: PiletApi) {
  app.registerExtension('patient-result', PatientResult);

  app.registerExtension('home-dashboard', () => (
    <app.Restriction privilege="View Patients">
      <Link className="omrs-link" to="/patients">
        Patients
      </Link>
    </app.Restriction>
  ));

  app.registerPage('/patients/:id?', Patients);
}
