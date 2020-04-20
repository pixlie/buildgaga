import { TOGGLE_BURGER_NAV } from './actions';


const defaultState = {
  isSourceBrowserEnabled: false
};


export default (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_BURGER_NAV:
      return {
        ...state,
        isTopnavEnabled: !state.isTopnavEnabled,
      }

    default:
      return state;
  }
}