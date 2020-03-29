import axios from 'axios'

import { UPDATE_AUTH } from './types'

export const someAction = data => async dispatch => {
	try {
		dispatch({
			type: UPDATE_AUTH
			// payload: data
		})
	} catch (err) {
		console.error(err)
	}
}
