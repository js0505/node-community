import axios from "axios"
import { ADMISSION_USER, REFUSE_USER, WAITING_REGISTER_USER } from "./types"

export function waitingRegisterUser() {
	const request = axios
		.get("/api/admin/admission", { withCredentials: true })
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
		.put("/api/admin/admission", variables, {
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
		.delete(`/api/admin/admission`, variables, {
			withCredentials: true,
		})
		.then((res) => res.data)
	return {
		type: REFUSE_USER,
		payload: request,
	}
}
