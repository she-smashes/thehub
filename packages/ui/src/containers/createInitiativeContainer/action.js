import { CREATE_AN_INITIATIVE } from "../../constants/actions";
import Swagger from 'swagger-client';

export const sendInitiativeDetails = (initiativeDetails, userInfo) => {
  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = userInfo.id;
          return req;
        },
      })
      .then((client) => {

        let postBody = {
          "title": initiativeDetails.title,
          "description": initiativeDetails.description,
          "createdBy": userInfo.userId,
          "lead": initiativeDetails.leadId
        };
        postBody = JSON.stringify(postBody)

        return client
          .apis
          .initiative
          .initiative_create({ data: postBody });

      });
  }
}
export const updateInitiativeInfo = (initiativeInfo) => {
  return {
    type: CREATE_AN_INITIATIVE,
    payload: initiativeInfo
  };
}