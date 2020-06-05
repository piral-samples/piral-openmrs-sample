import * as React from 'react';
import { PageComponentProps } from '@openmrs/app-shell';
import { always } from 'kremling';
import { Trans } from 'react-i18next';
import { LogoFull } from './assets/openmrs-logo-full';
import { LogoPartial } from './assets/openmrs-logo-partial';
import { performLogin, getCurrentUser } from './api';
import styles from './styles.css';

const Login: React.FC<PageComponentProps> = ({ piral }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [checkingIfLoggedIn, setCheckingIfLogged] = React.useState(true);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const usernameInputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsLoggingIn(true);
  }

  React.useEffect(() => {
    if (checkingIfLoggedIn) {
      getCurrentUser().then(
        (response) => {
          if (response && response.authenticated) {
            piral.setSession(response.user);
          } else {
            setCheckingIfLogged(false);
          }
        },
        () => setCheckingIfLogged(false),
      );
    }
  }, [checkingIfLoggedIn]);

  React.useEffect(() => {
    function tryLoggingIn() {
      performLogin(username, password)
        .then((response) => {
          if (response) {
            if (response.authenticated) {
              piral.setSession(response.user);
            } else {
              setErrorMessage('Incorrect username or password');
              passwordInputRef.current.focus();
            }
          }
        })
        .catch((error) => setErrorMessage(error.message))
        .then(() => setIsLoggingIn(false));
    }

    if (isLoggingIn) {
      tryLoggingIn();
    }
  }, [isLoggingIn]);

  React.useEffect(() => {
    if (document.activeElement !== usernameInputRef.current && !checkingIfLoggedIn) {
      passwordInputRef.current.focus();
    }
  }, [showPassword, checkingIfLoggedIn]);

  if (checkingIfLoggedIn) {
    return null;
  }

  const { logo } = piral.getCurrentConfig();

  return (
    <div className={`canvas ${styles['container']}`}>
      <div className={`omrs-card ${styles['login-card']}`}>
        <div className={styles['center']}>
          {logo.src ? <img src={logo.src} alt={logo.alt} /> : <LogoFull className={styles['logo']} />}
        </div>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="omrs-input-group">
            <input
              id="username"
              className={always('omrs-input-outlined').maybe('omrs-input-danger', !!errorMessage)}
              type="text"
              name="username"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
              ref={usernameInputRef}
              autoFocus
              required
            />
            <label htmlFor="username">
              <Trans i18nKey="username">Username</Trans>
            </label>
          </div>
          <div className="omrs-input-group">
            <input
              id="password"
              className={always('omrs-input-outlined').maybe('omrs-input-danger', !!errorMessage)}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              ref={passwordInputRef}
              required
            />
            <label htmlFor="password">
              <Trans i18nKey="password">Password</Trans>
            </label>
            <button
              className={`omrs-unstyled ${styles['icon-btn']}`}
              type="button"
              aria-label="Toggle view password text"
              onClick={() => setShowPassword(!showPassword)}>
              <svg className="omrs-icon" role="img">
                <use xlinkHref="#omrs-icon-visibility" />
              </svg>
            </button>
          </div>
          <div className={styles['center']}>
            <p className={styles['error-msg']}>{errorMessage}</p>
          </div>
          <div>
            <button
              className={always(`omrs-margin-top-24 omrs-btn omrs-btn-lg ${styles['submit-btn']}`).toggle(
                'omrs-filled-disabled',
                'omrs-filled-action',
                !password || !username,
              )}
              type="submit"
              disabled={!password || !username}>
              <Trans i18nKey="login">Login</Trans>
            </button>
          </div>
        </form>
      </div>
      <div className="omrs-margin-top-32">
        <p className={styles['powered-by-txt']}>
          <Trans i18nKey="poweredBy">Powered by</Trans>
        </p>
        <div>
          <LogoPartial className={styles['powered-by-logo']} />
        </div>
      </div>
    </div>
  );
};

export default Login;
