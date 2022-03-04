import postReducer from './posts.reducer'
import * as actions from './action.types'

const testData = {
	posts: [
		{
			userId: 1,
			id: 1,
			title: 'TestTitle1',
			body: 'TestBody1'
		},
		{
			userId: 2,
			id: 2,
			title: 'TestTitle2',
			body: 'TestBody2'
		}],
	filteredposts: []
}

describe('Testing Actions indivdually', () => {
	it('Action FILTER_POST: should update the filteredpost array', () => {
		let filter_test = postReducer(testData, {
			type: actions.FILTER_POSTS,
			payload: {
				userId: 1
			}
		})
		expect(filter_test.filteredposts.length).toEqual(1)
		expect(filter_test.filteredposts[0].title).toEqual('TestTitle1')
	})

	it('Action UPDATE_POST: should update the post with given ID', () => {
		let update_post_test = postReducer(testData, {
			type: actions.UPDATE_POST,
			payload: {
				userId: 1,
				id: 1,
				title: 'NewTestTitle',
				body: 'NewTestBody'
			}
		})
		expect(update_post_test.posts[0].title).toEqual('NewTestTitle');
	})

	it('Action ADD_POST: should Add the post to given User with UserId', () => {
		let add_post_test = postReducer(testData, {
			type: actions.ADD_POST,
			payload: {
				userId: 1,
				title: 'TestTitle3',
				body: 'TestBody3'
			}
		})
		expect(add_post_test.posts.length).toEqual(3);
		expect(add_post_test.posts[2].id).toEqual(3);
	})

	it('Action DELETE_POST: should delete the post with given id', () => {
		let add_post_test = postReducer(testData, {
			type: actions.DELETE_POST,
			payload: {
				id: 1
			}
		})
		expect(add_post_test.posts.length).toEqual(1);
		expect(add_post_test.posts[0].title).toEqual('TestTitle2');
	})
})

describe('Testing GET Actions indivdually', () => {
	it('Action GET_POST: should return all posts', () => {
		let get_post_test = postReducer(undefined, {
			type: actions.GET_POSTS,
			payload: {
				allposts: testData.posts
			}
		})
		expect(get_post_test.posts[0].title).toEqual('TestTitle1');
		expect(get_post_test.posts.length).toEqual(testData.posts.length);
		expect(get_post_test.filteredposts.length).toEqual(0)
	})

	it('Action GET_ALL_POSTS: should return empty data when undefined state.', () => {
		let get_all = postReducer(undefined, {
			type: actions.GET_ALL_POSTS,
		})
		expect(get_all.posts.length).toEqual(0);
		expect(get_all.filteredposts.length).toEqual(0);
	})

	it('Action GET_ALL_POSTS: should return original testData when defined state.', () => {
		let get_all = postReducer(testData, {
			type: actions.GET_ALL_POSTS,
		})
		expect(get_all.posts.length).toEqual(2);
		expect(get_all.filteredposts.length).toEqual(0);
	})

})