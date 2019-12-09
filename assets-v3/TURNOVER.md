# Questions

### Requests

- [request handling](https://github.com/VentesWorks/ventesforces2/blob/master/src/assets-v3/app/utils/request.js) - Import these methods into our sagas file, in order to be able to make requests depending on your action.

- [creating your own instance](https://github.com/axios/axios#creating-an-instance) - if you want to create an api with a different baseUrl or any other specification.

```
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

### Ant-Design

- [ant-design](https://github.com/ant-design/ant-design) - An enterprise-class UI design language and React-based implementation.

### Routes

- [Route Handling](https://github.com/VentesWorks/ventesforces2/blob/master/src/assets-v3/app/routes.js#L46) - for every route that has a reducer and a saga, you must register it as well in your route. An example for this is organization route. If I want to trigger another saga from a different container or if I want to use other state of different containers, it must be also imported. You can see this in the sample below:

```
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
```

### Redux-Saga

- [Redux-Saga](https://github.com/redux-saga/redux-saga) - middleware to handle promises

An `action` is needed to trigger a watch in saga, in this sample an action is dispatched and we are listening to `GET_PERSONAL_INFO` is triggered when a specific action is dispatched.

```
export function* getPersonalInfo() {
  try {
    const { data } = yield call(getRequest, '/remaining-credits/');
    yield put(fetchPersonalInfoSuccess(data.remaining_credits));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchPersonalInfo() {
  const watcher = yield takeLatest(GET_PERSONAL_INFO, getPersonalInfo);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
```

- Use `call` for API request related actions inside your saga. You can use `getRequest`, `postRequest`, `putRequest`, `deleteRequest` that are in `utils/request` directory.

- Use `put` for dispatching another action for your reducer, a sample for this is in the code above where we called `fetchPersonalInfoSuccess` to dispatch an action into the saga, so that we can update reducer with the fetched data we just recently receive and update the apps remaining credits. `put` can also be used to dispatch other sagas.

```
export default [watchPersonalInfo]
```

on every saga file, we export the `watch` methods in an array.

### Styled Components

- [styled components](https://www.styled-components.com/) - Utilising tagged template literals (a recent addition to JavaScript) and the power of CSS, styled-components allows you to write actual CSS code to style your components.

### Reselect

- [reselect](https://github.com/reduxjs/reselect) - Selectors can compute derived data, allowing Redux to store the minimal possible state.

Example of creating a sample selector:

```
import { createSelector } from 'reselect';
  const selectLists = (state) => state.get('lists');
  const makeSelectLBLists = () =>
  createSelector(selectLists, (substate) => substate.get('lbLists').toJS());
  export { selectLists, makeSelectLBLists };
```

the main selector name must match in the `routes.js` to be able to use `state.get('lists');` [reference](https://github.com/VentesWorks/ventesforces2/blob/master/src/assets-v3/app/routes.js#L127) in this route, the main selector in `routes.js` is `lists` so the selector must be the same. If for example selectors and routes does not match, the application WILL thrown an `error`.

```
const makeSelectSearchParams = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('searchParams').toJS()
  );

const makeSelectTotal = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('total'));

// for selected filter list
const makeSelectKeywords = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('keywords').toJS()
  );

const makeSelectCategories = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('category'));
```

selectors that are object and arrays just like `makeSelectSearchParams` and `makeSelectKeywords` needs to have `.toJS()` called when declaring as seen in the example above. If you don't follow this, your app will throw an error. Other data types like string, boolean, numbers doesn't need `.toJS()` at the end of your `substate.get()` just like `makeSelectTotal` and `makeSelectCategories`.

### ImmutableJS

- [ImmutableJS](https://facebook.github.io/immutable-js/) - data cannot be changed once created, leading to much simpler application development, no defensive copying, and enabling advanced memoization and change detection techniques with simple logic.

### Contact Table

- [Contact Table](https://github.com/VentesWorks/ventesforces2/tree/master/src/assets-v3/app/components/ContactTable) - documentations on how to use our tables are all in https://ant.design/components/table/

this code on onChangeRoute is used when we navigate to company deep view

```
  onChangeRoute = (route) => {
    const {
      searchParams,
      category,
      keywords,
      activeSpecialFilter,
    } = this.props;
    const { router } = this.context;
    router.push({
      pathname: router.location.pathname,
      state: { searchParams, category, keywords, activeSpecialFilter },
    });
    router.push({
      pathname: route,
    });
  };
```

the reason for this is passing a state with it, so when we navigate back to homepage route. The platform knows which props to load: [HomePage line 137](https://github.com/VentesWorks/ventesforces2/blob/master/src/assets-v3/app/containers/HomePage/index.js#L137)
whether it's the default props, or the previous state before the user navigated to company deep view.

### HomePage

- [Home Page](https://github.com/VentesWorks/ventesforces2/blob/master/src/assets-v3/app/containers/HomePage/index.js#L153) - Every time we make a change in our props, specifically changes on `searchParams` and `category` we have a `componentDidUpdate` method that listens to every change to call specific methods to refresh our list.

```
  componentDidUpdate(prevProps) {
    const { searchParams, category, getList } = this.props;
    const searchParamChanged = !_.isEqual(searchParams, prevProps.searchParams);
    if (searchParamChanged) {
      getList(searchParams, category);
      this.props.updateSelectedRows([], []);
      this.props.getlbLists(category);
    }
  }
```

### Reducer with immutable

- if you want to update a specific key of your object use

```
    case UPDATE_SEARCH_PARAMS:
      return state.setIn(['searchParams', action.key], action.value);
```

- if you want to update an array, enclose your array with the `fromJS()` method

```
  .set('selectedRowKeys', fromJS([]))
```

- if you want to update a string, boolean, number

```
  .set('category', action.category)
  .set('fetching', true)
  .set('total', 0)
```

- if you want to update a specific data in your array

```
  .updateIn(['searchParams', 'filters', 'company_keywords'], (arr) =>
    arr.filter((t) => t !== action.keyword.name)
  );
```

### Search

- For reference on the search component refer to [Search](https://github.com/VentesWorks/ventesforces2/blob/master/src/assets-v3/app/components/Search/index.js)

```
  handleAddition = (tag) => {
    if (!tag) {
      return;
    }
    const tagType = tag.type || 'and_keywords';
    let selectedKeyword = {
      category: this.props.category,
      filters: tagType,
      name: tag.name.split(' -')[0],
      mode: '',
    };

    // Case when no suggestion is selected
    if (tagType === 'and_keywords') {
      selectedKeyword = {
        type: 'Keyword',
        ...selectedKeyword,
      };
    }
```

on handleAddition we map every added tag when we enter/click add a new tag so that it would be then updates to our keywords and searchparams values in the reducer.

### Advance

- For reference on the advance component refer to [Advance](https://github.com/VentesWorks/ventesforces2/blob/master/src/assets-v3/app/components/Advance/index.js)
- this is where we add our different kinds of filters within the platform. Filters like `LocationFilter`,`TechnologyFilter`, `IndustryFilter` can be found in here.

### ContactOptions

- For reference on the advance component refer to [ContactOptions](https://github.com/VentesWorks/ventesforces2/blob/master/src/assets-v3/app/components/ContactOptions/index.js) this is where we handle our `Pagination` and `Actions` like `unlocking`, `exporting`, `reporting` of our leads inside the platform. It is divided to two major components which is `<PageActions />` and `<Pages />`
