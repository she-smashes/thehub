import axios from 'axios';

import { CREATE_AN_EVENT, GET_INITIATIVES, GET_CATEGORIES, GET_PARTICIPANTS } from "../../constants/actions";
import CreateEvent from '../../components/createEvent';
import Swagger from 'swagger-client';
export const getParticipantList = (userInfo) => {
  
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
            .participant
            .participant_find();
        });
    }
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

    
    export const getApprovedInitiatives = (userInfo) => {
      
        return function (dispatch) {
          return Swagger(process.env.REACT_APP_API_URI,
            {
              requestInterceptor: (req) => {
                req.headers['Authorization'] = userInfo.id;
                return req;
              },
            })
            .then((client) => {

              let filterQuery = {"where":{"status":"approved"}};
              filterQuery = JSON.stringify(filterQuery)

              return client
                .apis
                .initiative
                .initiative_find({ filter: filterQuery });
            });
        }
      }
    

export const sendEventDetails = (eventObj, userInfoObj) => {
  
  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = userInfoObj.id;
          return req;
        },
      })
      .then((client) => {

        let categoryId = eventObj.categoryType;
        if(eventObj.subCategoryType !== '' && eventObj.subCategoryType !== undefined) {
          categoryId = eventObj.subCategoryType;         
        }
        let postBody =   {
          "initiativeId": eventObj.initiativeName,
          "title": eventObj.title,
          "startDate": eventObj.eventStartDate,
          "endDate": eventObj.eventEndDate,
          "location": eventObj.location,
          "description": eventObj.description,
          "lead": eventObj.leadId,
          "createdBy": userInfoObj.userId,
          "participantId": eventObj.participantsSelected,
          "categoryId": categoryId
        };
        postBody = JSON.stringify(postBody)
        return client
          .apis
          .event
          .event_create({ data: postBody });
      });
  }
}
export const updateParticipantsList = (participantInfo) => {
    return {
      type: GET_PARTICIPANTS,
      payload: participantInfo
    };
  }
  
export const updateCategoriesList = (categoriesInfo) => {
  return {
    type: GET_CATEGORIES,
    payload: categoriesInfo
  };
}
export const updateApprovedInitiativesList = (initiativesInfo) => {
  return {
    type: GET_INITIATIVES,
    payload: initiativesInfo
  };
}