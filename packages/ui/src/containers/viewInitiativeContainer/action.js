import axios from 'axios';

import { DEFAULT_INITIATIVES } from "../../constants/actions";
import { GET_INITIATIVES } from "../../constants/apiList";

export const getInitiativeList = (accessToken) => {
  const request = axios.get(GET_INITIATIVES+'?access_token='+accessToken);
  return {
    type: DEFAULT_INITIATIVES,
    payload: request
  };
}
