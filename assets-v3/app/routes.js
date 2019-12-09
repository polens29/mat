// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  function homePageDisplay(nextState, cb) {
    const importModules = Promise.all([
      import('containers/Lists/reducer'),
      import('containers/SavedSearch/reducer'),
      import('containers/HomePage/sagas'),
      import('containers/Lists/sagas'),
      import('containers/SavedSearch/sagas'),
      import('containers/HomePage'),
    ]);

    const renderRoute = loadModule(cb);

    importModules.then(([listReducer, savedSearchReducer, sagas, listSaga, savedSearchSaga, component]) => {
      injectReducer('lists', listReducer.default);
      injectReducer('savedSearch', savedSearchReducer.default);
      injectSagas(sagas.default);
      injectSagas(listSaga.default);
      injectSagas(savedSearchSaga.default);
      renderRoute(component);
    });

    importModules.catch(errorLoading);
  }

  const childRoutes = [
    {
      path: '/s/leadbook-database-react',
      name: 'home',
      getComponent: homePageDisplay,
    },
    {
      path: '/',
      name: 'home',
      getComponent: homePageDisplay,
    },{
      path: '/leadbook-database-react',
      name: 'home',
      getComponent: homePageDisplay,
    },
    {
      path: '/index.php/s/leadbook-database-react',
      name: 'home',
      getComponent: homePageDisplay,
    },
    {
      path: '/app/v3/organization/:id',
      name: 'organization',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/OrganizationView/reducer'),
          import('containers/OrganizationView/sagas'),
          import('containers/HomePage/sagas'),
          import('containers/OrganizationView'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, homepageSaga, component]) => {
          injectReducer('organizationView', reducer.default);
          injectSagas(sagas.default);
          injectSagas(homepageSaga.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    
    {
      path: '*',
      name: 'notfound',
      getComponent: homePageDisplay,
    },
  ];
  return {
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        import('containers/HomePage/reducer'),
        import('containers/Integrations/reducer'),
        import('containers/Integrations/sagas'),
        import('containers/App/sagas'),
        import('containers/App'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(
        ([
          homepageReducer,
          integrationReducer,
          integrationSaga,
          sagas,
          component,
        ]) => {
          injectReducer('homePage', homepageReducer.default);
          injectReducer('integrations', integrationReducer.default);
          injectSagas(integrationSaga.default);
          injectSagas(sagas.default);
          renderRoute(component);
        }
      );

      importModules.catch(errorLoading);
    },
    childRoutes,
  };
}
