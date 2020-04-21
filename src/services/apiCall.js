import axios from 'axios';


// export function setTokenHeader(token){
// 	if(token){
// 		axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
// 	}else{
// 		delete axios.defaults.headers.common['authorization']
// 	}
// }

const url='http://localhost:3000';

export const apiCall = axios.create({
  baseURL: url
});

export function setTokenHeader(token){
 if(token){
   apiCall.defaults.headers.common["authorization"] = `Bearer ${token}`;
 }else{
   delete apiCall.defaults.headers.common['authorization']
 }
}




