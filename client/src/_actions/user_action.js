import axios from "axios"
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types"
const userAPI = "/api/users"
export function loginUser(body) {
	const request = axios
		.post(`${userAPI}/login`, body, {
			withCredentials: true,
		})
		.then((res) => res.data)
	return {
		type: LOGIN_USER,
		payload: request,
	}
}

export function logoutUser() {
	const request = axios.get(`${userAPI}/logout`, {
		withCredentials: true,
	})
	return {
		type: LOGOUT_USER,
		payload: request,
	}
}

export function registerUser(body) {
	const request = axios.post(`${userAPI}`, body).then((res) => res.data)
	return {
		type: REGISTER_USER,
		payload: request,
	}
}

export function auth() {
	const request = axios
		.get(`${userAPI}/auth`, { withCredentials: true })
		.then((res) => res.data)
	return {
		type: AUTH_USER,
		payload: request,
	}
}
