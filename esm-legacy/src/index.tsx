import * as React from 'react';
import { PiletApi } from '@openmrs/app-shell';

export function setup(app: PiletApi) {
  app.defineConfigSchema(
    {
      list: {
        arrayElements: {
          label: {},
          link: {},
        },
      },
    },
    {
      list: [
        {
          label: 'Active Visits',
          link: '/openmrs/coreapps/activeVisits.page?app=coreapps.activeVisits',
          requiredPrivilege: 'App: coreapps.activeVisits',
        },
        {
          label: 'Capture Vitals',
          link: '/openmrs/coreapps/findpatient/findPatient.page?app=referenceapplication.vitals',
          requiredPrivilege: 'App: referenceapplication.vitals',
        },
        {
          label: 'Appointment Scheduling',
          link: '/openmrs/appointmentschedulingui/home.page',
          requiredPrivilege: 'App: appointmentschedulingui.home',
        },
        {
          label: 'Reports',
          link: '/openmrs/reportingui/reportsapp/home.page',
          requiredPrivilege: 'View Reports',
        },
        {
          label: 'Data Management',
          link: '/openmrs/coreapps/datamanagement/dataManagement.page',
          requiredPrivilege: 'App: coreapps.dataManagement',
        },
        {
          label: 'Configure Metadata',
          link: '/openmrs/adminui/metadata/configureMetadata.page',
          requiredPrivilege: 'App: coreapps.configuremetadata',
        },
        {
          label: 'System Administration',
          link: '/openmrs/coreapps/systemadministration/systemAdministration.page',
          requiredPrivilege: 'App: coreapps.systemAdministration',
        },
      ],
    },
  );

  const { list } = app.getCurrentConfig();

  for (const item of list) {
    app.registerExtension('home-dashboard', () => (
      <app.Restriction privilege={item.requiredPrivilege}>
        <a className="omrs-link" href={item.link}>{item.label}</a>
      </app.Restriction>
    ));
  }
}
