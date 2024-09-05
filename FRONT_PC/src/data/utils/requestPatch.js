import axios from "axios";

export default async function requestPatch(urlParams, body=null, params={}, token=null){
    const url = import.meta.env.VITE_PROTOCOLO_DEV + import.meta.env.VITE_IP_DEV + urlParams;
    if(token != null){
        token = 'Bearer ' + token;
    }
    
    return axios.patch(url, body, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      },
      params: params
    })
}