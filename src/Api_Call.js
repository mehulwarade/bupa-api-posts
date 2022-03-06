// https://stackoverflow.com/a/61578718

import axios from 'axios';

// Redux
import store from './redux/store';
import * as actions from './redux/action.types';

export const API_GET_DEFAULT_LIST = async (props) => {
	const { API_URL } = props;

	let CallResponse = await axios.get(API_URL)
		.then(res => {
			if (res.status) {
				store.dispatch({
					type: actions.GET_POSTS,
					payload: {
						allposts: res.data
					}
				});
				return true;
			}
		})
		.catch(err => {
			alert(`API_GET_DEFAULT_LIST Error: ${err.response}`);
			return false;
		})
	return CallResponse;
}

export const API_ADD_UPDATE_LIST = async (props) => {
	// Error when you add (it adds locally id = 101) and then update, the API call throws an error as the server does not have id=101;

	const { API_URL, id, title, body, userId } = props;

	if (id !== 0 && title !== 0 && body !== '' && userId !== 0) {
		// console.log('ID present. Updating:');
		let CallResponse = await axios.get(`${API_URL}/${props.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				id: props.id,
				title: props.title,
				body: props.body,
				userId: props.userId,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then(response => {
				if (response.status) {
					// console.log(`Put request succeeded. Moving on.`);
					store.dispatch({
						type: actions.UPDATE_POST,
						payload: {
							userId: props.userId,
							id: props.id,
							title: props.title,
							body: props.body
						}
					});
					return true;
				}
				else {
					alert(`Could not update! Please debug.`);
					return false;
				}
			})
			.catch(err => {
				alert(`API_UPDATE_LIST Error: ${err.response}`);
				return false;
			})
		return CallResponse;
	}
	else if (userId !== 0 && title !== 0 && body !== '' && id === 0) {
		// console.log('ID not present. Adding:');
		let CallResponse = await axios.get(API_URL, {
			method: 'POST',
			body: JSON.stringify({
				title: props.title,
				body: props.body,
				userId: props.userId,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => {
				if (response.status) {
					// console.log(`Post request succeeded. Moving on.`);
					store.dispatch({
						type: actions.ADD_POST,
						payload: {
							userId: props.userId,
							title: props.title,
							body: props.body
						}
					});
					return true;
				}
				else {
					alert(`Could not add! Please debug.`);
					return false;
				}
			})
			.catch(err => {
				alert(`API_ADD_LIST Error: ${err.response}`);
				return false;
			})
		return CallResponse;
	}
}

export const API_FILTER_LIST = async (props) => {
	// Implemented filter by just userID. Filtering by ID or both should be easy with few if statements.
	const { API_URL, userId } = props;

	let CallResponse = await axios.get(`${API_URL}?userId=${userId}`)
		.then(res => {
			// console.log(`Filtering all posts from the userID: ${userId}`);
			// Checking server response.
			if (res.status) {
				// console.log(`Get request succeeded. Moving on.`);
				store.dispatch({
					type: actions.FILTER_POSTS,
					payload: {
						userId: userId
					}
				});
				return true;
			}
			else {
				alert(`Something went wrong! Please debug.`);
				return false;
			}
		})
		.catch(err => {
			alert(`API_FILTER_LIST Error: ${err.response}`);
			return false;
		})
	return CallResponse;
}

export const API_DELETE_LIST = async (props) => {
	// Implemented filter by just userID. Filtering by ID or both should be easy with few if statements.
	const { API_URL, id } = props;

	let CallResponse = await axios.get(`${API_URL}/${id}`, {
		method: 'DELETE'
	})
		.then((res) => {
			// Checking server response.
			if (res.status) {
				// console.log(`Get request succeeded. Moving on.`);
				store.dispatch({
					type: actions.DELETE_POST,
					payload: {
						id: id
					}
				});
				return true;
			}
			else {
				alert(`Something went wrong! Please debug.`);
				return false;
			}
		})
		.catch(err => {
			alert(`API_DELETE_LIST Error: ${err}`);
			return false;
		})
	return CallResponse;
}

export const API_GET_CURRENT_LIST = async () => {
	store.dispatch({
		type: actions.GET_ALL_POSTS,
	});
	return true;
}