import * as actions from './action.types'

// job of reducer is to perform 'action' on the 'currentState' and return the newState
// Reducer is pure function. This code should never change. Make all the API calls and everything outside and only pass the data here.

// We are mutating the currentState everywhere. Need to create new state everytime by using library like immutability.js
const initialState = {
	posts: [],
	filteredposts: []
}

const postReducer = (currentState = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case actions.GET_POSTS:
			// This is the new State after the action is performed.
			return {
				posts: [
					...currentState.posts, ...payload.allposts
				],
				filteredposts: [...currentState.filteredposts]
			}
		case actions.FILTER_POSTS:
			return {
				posts: [...currentState.posts],
				filteredposts: currentState.posts.filter(eachPost => eachPost.userId === payload.userId)
			}
		case actions.UPDATE_POST:
			return {
				posts: currentState.posts.map((eachPost) => {
					if (eachPost.id === payload.id) {
						return {
							userId: payload.userId,
							id: payload.id,
							title: payload.title,
							body: payload.body
						}
					}
					return eachPost;
				}),
				filteredposts: [...currentState.filteredposts]
			}

		case actions.ADD_POST:
			return {
				posts: [...currentState.posts,
				{
					userId: payload.userId,
					id: currentState.posts.length + 1,
					title: payload.title,
					body: payload.body
				}],
				filteredposts: [...currentState.filteredposts]
			}
		case actions.GET_ALL_POSTS:
			return {
				posts: [...currentState.posts],
				filteredposts: []
			}
		case actions.DELETE_POST:
			return {
				posts: currentState.posts.filter(eachPost => eachPost.id !== payload.id),
				filteredposts: [...currentState.filteredposts]
			}
		default:
			return currentState
	}
}

export default postReducer;