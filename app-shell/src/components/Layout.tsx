import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { useGlobalState } from 'piral-core';
import { Menu } from 'piral-menu';
import { Notifications } from 'piral-notifications';

function routeDisplacer(history: History, session: any, path = history.location.pathname) {
  if (!session && path !== '/login') {
    history.replace('/login');
  } else if (session && path === '/login') {
    history.replace('/');
  }
}

export const Layout: React.FC = ({ children }) => {
  const session = useGlobalState((s) => s.session);
  const history = useHistory();

  React.useEffect(() => {
    routeDisplacer(history, session);

    return history.listen((location) => {
      const path = location.pathname;
      routeDisplacer(history, session, path);
    });
  }, [session]);

  return (
    <>
      <Notifications />
      {session && <Menu type="general" />}
      {children}
    </>
  );
};
