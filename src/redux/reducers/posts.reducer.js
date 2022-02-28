

// action = {
// 	type: get_posts,
// 	payload:
// }

const tempState = {
	posts: [],
	filteredposts: []
}

const reducer = (previousState = tempState, action) => {
	const {type, payload} = action;

	switch(type){
		case 'get_all_posts':
			return {
				...previousState,
				posts: payload,
				
			}
		default:
			return previousState
	}
}

export default reducer;