/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import 'sanitize.css/sanitize.css';
import '!!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css';
import '!!style-loader!css-loader!font-awesome/css/font-awesome.min.css';
import '!!style-loader!css-loader!material-design-icons/iconfont/material-icons.css';
import 'antd/dist/antd.css';
import 'react-quill/dist/quill.snow.css';

import ReactGA from 'react-ga';

import { defaultContactColumns, defaultCompanyColumns } from 'utils/helper';
import { setColumnDisplay } from 'containers/App/actions';
// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from 'containers/App/selectors';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Import CSS reset and Global Styles
import 'styles/global-styles';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './store';

// Import i18n messages
import { translationMessages } from './i18n';

// Import root routes
import createRoutes from './routes';

// Remove all saved data from sessionStorage
// sessionStorage.clear();

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

ReactGA.initialize('UA-73630604-1');

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

sessionStorage.clear();

if (!sessionStorage.getItem('tableColumns')) {
  const tableColumns = {
    defaultContactColumns,
    defaultCompanyColumns,
  };

  sessionStorage.setItem('tableColumns', JSON.stringify(tableColumns));
  store.dispatch(setColumnDisplay('Contact', defaultContactColumns));
  store.dispatch(setColumnDisplay('Organization', defaultCompanyColumns));
} else {
  const defaultColumns = JSON.parse(sessionStorage.getItem('tableColumns'));
  store.dispatch(
    setColumnDisplay('Contact', defaultColumns.defaultContactColumns)
  );
  store.dispatch(
    setColumnDisplay('Organization', defaultColumns.defaultCompanyColumns)
  );
}

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <Router
          history={history}
          routes={createRoutes(store)}
          render={applyRouterMiddleware(useScroll())}
          onUpdate={logPageView}
        />
      </LanguageProvider>
    </Provider>,
    document.getElementById('app')
  );
};

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
