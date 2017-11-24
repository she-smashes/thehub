
/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */


import axios from 'axios';
import Swagger from 'swagger-client';

import { DEFAULT_EVENTS } from "../../constants/actions";

import { SWAGGER_SPEC_URL } from "../../constants/apiList";


export const getEventList = (access_token) => {
  
    return function (dispatch) {
      Swagger(SWAGGER_SPEC_URL,
        {
          requestInterceptor: (req) => {
            req.headers['Authorization'] = access_token;
            return req;
          },
        })
        .then((client) => {

          client
            .apis
            .event
            .event_listEvents()
            .then(resp => dispatch(getResponse(resp)),
          )
        });
    }
  }
    function getResponse(resp) {
      return {
        type: DEFAULT_EVENTS,
        payload: resp
      };
    }
    
  



