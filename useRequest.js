import axios from "axios";
import { logout } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

var API_URL='http://localhost:3000/api';

export default function useRequest(method, url) {
  // IMPORTANT
  // Following code gets accessToken from redux toolkit. You may change with your arch. For example, localStorage.
  const { accessToken } = useSelector(state => state.auth);

  // Defines
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create Axios Instance
  const instance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Access-Control-Allow-Origin": "*"
    }
  })

  return {
    async send(payload) {
      if( !payload ) {
        payload = { query: {}, data: {} };
      }
  
      const response = await instance.request({
        method,
        url,
        params: payload.query,
        data: payload.data,
      });

      return {
        ...response.data,
        status: response.status < 400,
      };
    }
  }

}
