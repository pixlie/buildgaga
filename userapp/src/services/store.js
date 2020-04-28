import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';


export default initialState => {
  // Grab the state from a global variable injected into the server-generated HTML
  // https://github.com/stereobooster/react-snap#redux
  const preloadedState = window.__PRELOADED_STATE__;

  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__;

  initialState =
    preloadedState || JSON.parse(window.localStorage.getItem("cache.redux.state")) || initialState;

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk
      )
      /* window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__() */
    )
  );

  store.subscribe(() => {
    const state = store.getState();
    const persist = {};

    window.localStorage.setItem("cache.redux.state", JSON.stringify(persist));

    // This is for React/Redux hydrate to work on client side
    // https://github.com/stereobooster/react-snap#redux
    window.snapSaveState = () => ({
      __PRELOADED_STATE__: store.getState()
    });
  });

  return store;
}