import axios from "axios"
import { ADMISSION_USER, REFUSE_USER, WAITING_REGISTER_USER } from "./types"

let adminAPI = ""
if (process.env.NODE_ENV === "production") {
	adminAPI = "/api/admin/admission"
} else {
	adminAPI = "http://localhost:5000/api/admin/admission"
}
export function waitingRegisterUser() {
	const request = axios
		.get(adminAPI, { withCredentials: true })
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
		.put(adminAPI, variables, {
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
		.delete(adminAPI, variables, {
			withCredentials: true,
		})
		.then((res) => res.data)
	return {
		type: REFUSE_USER,
		payload: request,
	}
}
