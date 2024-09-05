import axios from "axios";

export default async function requestGet(urlParams, params={}, token=null){
  const url = import.meta.env.VITE_PROTOCOLO_DEV + import.meta.env.VITE_IP_DEV + urlParams;
  if(token != null){
      token = 'Bearer ' + token;
  }
  
  return axios.get(url, {
    headers: {
      'Authorization': token
    },
    params: params
  })
}