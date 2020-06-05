import * as React from 'react';
import { MenuComponentProps } from '@openmrs/app-shell';
import { performLogout } from './api';

export const Logout: React.FC<MenuComponentProps> = ({ piral }) => {
  const logout = () => [performLogout(), piral.setSession(undefined)];

  return (
    <>
      <button onClick={logout} className="omrs-btn omrs-outlined-neutral">
        Logout
      </button>
    </>
  );
};
