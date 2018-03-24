
/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */

import Swagger from 'swagger-client';

import {   GET_CATEGORIES, } from "../../constants/actions";

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
    payload: progressCategoriesInfo.userProgressInfo
  };
}
export const updateCategoriesList = (categoriesInfo) => {
  return {
    type: GET_CATEGORIES,
    payload: categoriesInfo
  };
}

export const getCategories = (userInfo) => {
  
    return function (dispatch) {
      return Swagger(process.env.REACT_APP_API_URI,
        {
          requestInterceptor: (req) => {
            req.headers['Authorization'] = userInfo.id;
            return req;
          },
        })
        .then((client) => {
          return client
            .apis
            .category
            .category_find();
        });
    }
  }





