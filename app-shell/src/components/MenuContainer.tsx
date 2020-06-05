import * as React from 'react';
import { Link } from 'react-router-dom';
import { MenuContainerProps } from 'piral-menu';
import { useGlobalState } from 'piral-core';
import { toggle } from 'kremling';
import { HomeIcon } from './HomeIcon';
import { MonoLogo } from './MonoLogo';
import { ChevronDownIcon } from './ChevronDownIcon';

export const MenuContainer: React.FC<MenuContainerProps> = ({ children }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const user = useGlobalState((s) => s.session);

  React.useEffect(() => {
    if (isUserMenuOpen) {
      const closePopup = () => setIsUserMenuOpen(false);
      window.addEventListener('click', closePopup);
      return () => window.removeEventListener('click', closePopup);
    }
  }, [isUserMenuOpen]);

  return (
    <>
      <nav className="top-nav">
        <Link to="/">
          <HomeIcon className="omrs-icon" />
        </Link>
        <div className="omrs-type-title-4">
          <MonoLogo role="img" width="10rem" />
        </div>
        <div>
          <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="omrs-unstyled user-popup">
            {user?.username || user?.display}
            <ChevronDownIcon className="omrs-icon" fill="var(--omrs-color-ink-medium-contrast)" />
          </button>
        </div>
      </nav>
      <div
        className={toggle('user-menu', 'hidden', isUserMenuOpen)}
        role="button"
        onClick={(evt) => evt.stopPropagation()}
        tabIndex={-1}>
        {children}
      </div>
    </>
  );
};
