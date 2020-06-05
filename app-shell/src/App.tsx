import * as React from 'react';
import * as actions from './actions';
import { Piral, createInstance } from 'piral-core';
import { createNotificationsApi } from 'piral-notifications';
import { createFeedsApi } from 'piral-feeds';
import { createModalsApi } from 'piral-modals';
import { createMenuApi } from 'piral-menu';
import { createContainersApi } from 'piral-containers';
import { I18nextProvider } from 'react-i18next';
import { translations } from './translations';
import { layout, errors } from './layout';
import { createSessionApi, createConfigApi, createCheckerApi } from './pilets';

const feedUrl = 'https://feed.piral.cloud/api/v1/pilet/openmrs';

const Provider: React.FC = ({ children }) => <I18nextProvider i18n={translations}>{children}</I18nextProvider>;

const instance = createInstance({
  actions,
  state: {
    components: layout,
    errorComponents: errors,
    provider: Provider,
    session: false,
  },
  extendApi: [
    createSessionApi(),
    createMenuApi(),
    createNotificationsApi(),
    createFeedsApi(),
    createContainersApi(),
    createModalsApi(),
    createConfigApi(),
    createCheckerApi(),
  ],
  requestPilets() {
    return fetch(feedUrl)
      .then((res) => res.json())
      .then((res) => res.items);
  },
});

export const App: React.FC = () => <Piral instance={instance} />;
