import * as React from 'react';
import { ComponentsState, ErrorComponentsState, SwitchErrorInfo } from 'piral-core';
import { Link } from 'react-router-dom';
import { Layout, LoadingIndicator, NotificationsHost, NotificationsToast, MenuContainer, MenuItem } from './components';

export const errors: Partial<ErrorComponentsState> = {
  not_found: () => (
    <div>
      <p className="error">Could not find the requested page. Are you sure it exists?</p>
      <p>
        Go back <Link to="/">to the dashboard</Link>.
      </p>
    </div>
  ),
};

export const layout: Partial<ComponentsState> = {
  ErrorInfo: (props) => (
    <div>
      <h1>Error</h1>
      <SwitchErrorInfo {...props} />
    </div>
  ),
  LoadingIndicator,
  Layout,
  NotificationsHost,
  NotificationsToast,
  MenuContainer,
  MenuItem,
};
