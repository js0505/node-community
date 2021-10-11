import axios from "axios"
import { ADMISSION_USER, REFUSE_USER, WAITING_REGISTER_USER } from "./types"

export function waitingRegisterUser() {
	const request = axios
		.get("http://localhost:5000/api/admin/admission", { withCredentials: true })
		.then((res) => res.data)
	return {
		type: WAITING_REGISTER_USER,
		payload: request,
	}
}

export function admissionUser(id) {
	const variables = {
		id,
	}
	const request = axios
		.put("http://localhost:5000/api/admin/admission", variables, {
			withCredentials: true,
		})
		.then((res) => res.data)
	return {
		type: ADMISSION_USER,
		payload: request,
	}
}

export function refuseUser(id) {
	const variables = {
		id,
	}
	const request = axios
		.delete(`http://localhost:5000/api/admin/admission`, variables, {
			withCredentials: true,
		})
		.then((res) => res.data)
	return {
		type: REFUSE_USER,
		payload: request,
	}
}
