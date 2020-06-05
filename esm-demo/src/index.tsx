import { PiletApi} from '@openmrs/app-shell';
import * as React from 'react';

export function setup(app: PiletApi) {
  app.showNotification('Hello OpenMRS!', {
    autoClose: 15000,
  });

  app.defineConfigSchema({
    increment: {},
  }, {
    increment: 1,
  });

  const { increment } = app.getCurrentConfig();

  app.registerExtension('home-dashboard', () => {
    const [count, setCount] = React.useState(0);
    return (
      <a className="omrs-link" href="https://google.com" onClick={ev => {
        setCount(count => count + increment);
      ev.preventDefault();
      }}>{count}!</a>
    );
  });
}
