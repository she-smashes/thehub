import axios from 'axios';

import { DEFAULT_INITIATIVES } from "../../constants/actions";
import { GET_INITIATIVES } from "../../constants/apiList";
import {initiativeList} from './data';

export const getInitiativeList = (accessToken) => {
  const request = axios.get(GET_INITIATIVES+'?access_token='+accessToken);
//  console.log(JSON.stringify(request)+"sudha");

  return {
    type: DEFAULT_INITIATIVES,
    payload: request
  };
}
