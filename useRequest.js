import axios from "axios";
import { logout } from "../store/auth";
import { useSelector } from "react-redux";

var API_URL='http://localhost:3000/api';

export default function useRequest(method, url) {
  // IMPORTANT
  // Following code gets accessToken from redux toolkit. You may change with your arch. For example, localStorage.
  const { accessToken } = useSelector(state => state.auth);

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
      const response = await instance.request({
        method,
        url,
      });

      return response;
    }
  }

}
