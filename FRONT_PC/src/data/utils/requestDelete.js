import axios from "axios";

export default async function requestDelete(urlParams, params={}, token=null){
    const url = import.meta.env.VITE_PROTOCOLO_DEV + import.meta.env.VITE_IP_DEV + urlParams;
    if(token != null){
        token = 'Bearer ' + token;
    }
    
    return axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      },
      params: params
    })
}