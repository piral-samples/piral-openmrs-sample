import * as React from 'react';
import { MenuItemProps } from 'piral-menu';

export const MenuItem: React.FC<MenuItemProps> = ({ children }) => (
  <div className="user-menu-card omrs-padding-16">{children}</div>
);
