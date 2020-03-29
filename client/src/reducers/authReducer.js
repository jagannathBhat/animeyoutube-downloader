import { UPDATE_AUTH } from '../actions/types'

const initialState = {
	isAuth: null,
	token: null,
	username: null
}

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_AUTH:
			return {
				...state,
				...action.payload
			}
		default:
			return state
	}
}
