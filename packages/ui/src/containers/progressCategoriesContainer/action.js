
/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */

import Swagger from 'swagger-client';

import { DEFAULT_PROGRESS_CATEGORIES } from "../../constants/actions";

export const getProgressCategoriesList = (access_token) => {

  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = access_token;
          return req;
        },
      })
      .then((client) => {
        return client
          .apis
          .userBadge
          .userBadge_listUserCategories();
      });
  }
}
export const updateProgressCategoriesInfo = (progressCategoriesInfo) => {
  return {
    type: DEFAULT_PROGRESS_CATEGORIES,
    payload: progressCategoriesInfo.categories
  };
}





