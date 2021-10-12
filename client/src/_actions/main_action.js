import axios from "axios"
import { GET_RESENT_BOARD } from "./types"

const mainPageAPI = "http://localhost:5000/api/main/"

export function getResentBoard() {
	const request = axios.get(`${mainPageAPI}`).then((res) => res.data)
	return {
		type: GET_RESENT_BOARD,
		payload: request,
	}
}
