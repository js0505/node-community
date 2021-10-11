import { ADMISSION_USER, REFUSE_USER, WAITING_REGISTER_USER } from "../_actions/types"

export default function (state = {}, action) {
	switch (action.type) {
		case WAITING_REGISTER_USER:
			return { ...state, userData: action.payload }
		case ADMISSION_USER:
			return { ...state, success: action.payload }
		case REFUSE_USER:
			return { ...state, success: action.payload }
		default:
			return state
	}
}
