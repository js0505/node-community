import {
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER,
	LOGOUT_USER,
	UPDATE_USER_INFO,
} from "../_actions/types"

export default function (state = {}, action) {
	switch (action.type) {
		case AUTH_USER:
			return { ...state, userData: action.payload }
		case LOGIN_USER:
			return { ...state, loginSuccess: action.payload }
		case LOGOUT_USER:
			return { ...state, logoutSuccess: action.payload }
		case REGISTER_USER:
			return { ...state, success: action.payload }
		case UPDATE_USER_INFO:
			return { ...state, userData: action.payload }
		default:
			return state
	}
}
