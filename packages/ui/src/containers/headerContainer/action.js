import {RESET_STORE} from '../../constants/actions';
export const resetStore = () => {
    return {
      type: RESET_STORE,
      payload: {}
    };
  }