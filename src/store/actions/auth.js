import axios from 'axios';
import {setTokenHeader} from '../../services/apiCall';
import {addErrorMessage, clearErrorMessage} from './errors';



export const setCurrentUser = (user) => {
	return {
		type:"SET_CURRENT_USER",
		user
	}	
}
export const setAuthorizationToken = (token)=>{
	setTokenHeader(token);
}



export const authenticateUser = (type,formData) =>{
	return async dispatch =>{
		try{
			const response = await axios.post(`/${type}`,formData);
			const {token,...user} = response.data;
			localStorage.setItem('jwtToken', token);			
			setAuthorizationToken(token);
			dispatch(setCurrentUser(user));
			dispatch(clearErrorMessage());
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
			throw new Error(err);

		}
		
	}
}


export const signout = () =>{
	return dispatch =>{
		localStorage.clear();
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	}
}

export const getCurrentUser =()=>{
	return async dispatch =>{
		try{
			const response = await axios.get('/user');
			dispatch(setCurrentUser(response.data));
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
			throw new Error(err);
		}
	}
}

export const readNotification = (id)=>{
	return async dispatch=>{
		try{
			const response = await axios.put(`/notifications/${id}`);
			dispatch(setCurrentUser(response.data));
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
			throw Error(err);
		}
	}
}

export const clearNotifications = ()=>{
	return async dispatch=>{
		try{
			const response = await axios.put('/notifications');
			dispatch(setCurrentUser(response.data));
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
			throw Error(err);
		}
	}
}

