import axios from "axios"
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types"

export function loginUser(body) {
	const request = axios
		.post("http://localhost:5000/api/users/login", body, {
			withCredentials: true,
		})
		.then((res) => res.data)
	return {
		type: LOGIN_USER,
		payload: request,
	}
}

export function logoutUser() {
	const request = axios.get("http://localhost:5000/api/users/logout", {
		withCredentials: true,
	})
	return {
		type: LOGOUT_USER,
		payload: request,
	}
}

export function registerUser(body) {
	const request = axios
		.post("http://localhost:5000/api/users/", body)
		.then((res) => res.data)
	return {
		type: REGISTER_USER,
		payload: request,
	}
}

export function auth() {
	const request = axios
		.get("http://localhost:5000/api/users/auth", { withCredentials: true })
		.then((res) => res.data)
	return {
		type: AUTH_USER,
		payload: request,
	}
}
