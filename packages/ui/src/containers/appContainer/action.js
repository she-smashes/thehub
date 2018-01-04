import Swagger from 'swagger-client';


export const verifyUser = (username, userInfo) => {
  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = userInfo.id;
          return req;
        },
      })
      .then((client) => {

        let filterQuery = {"where":{"username":username}};
        filterQuery = JSON.stringify(filterQuery)

        return client
          .apis
          .user
          .user_find({ filter: filterQuery });

      });
  }
}

export const verifyUsers = (usernames, userInfo) => {
  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = userInfo.id;
          return req;
        },
      })
      .then((client) => {
        console.log(usernames);
        let filterQuery =  {"where":{"username": {"inq": usernames}}}
        filterQuery = JSON.stringify(filterQuery)

        return client
          .apis
          .user
          .user_find({ filter: filterQuery });
      });
  }
}