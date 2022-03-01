import React, { Component } from 'react';
import axios from 'axios';

import styled from 'styled-components';

// Importing all the components
import { Header } from './components/Header/Header'
import { Button } from './components/Button/Button'
import List from './components/List/List'

// Redux
import store from './redux/store';
import * as actions from './redux/action.types';
import { connect } from 'react-redux';

const CommandStrip = styled.section`
  background: #f1f1f2;
  text-align: center;
`;

const Input = styled.input`
	margin: 1em;
	padding: 0.25em 1em;
	font-size: 16px;
`;

const API_URL = `https://jsonplaceholder.typicode.com/posts`;

class App extends Component {
	constructor(props) {
		super(props);

		this.InputUserID = React.createRef();
		this.InputID = React.createRef();
		this.InputTitle = React.createRef();
		this.InputBody = React.createRef();

		this.addupdate = this.addupdate.bind(this);
		this.filter = this.filter.bind(this);
		this.delete = this.delete.bind(this);
		this.allPosts = this.allPosts.bind(this);
		this.clearallinput = this.clearallinput.bind(this);
	}

	componentDidMount = async () => {
		// Initial load of all data from the server
		await axios.get(API_URL)
			.then(res => {
				store.dispatch({
					type: actions.GET_POSTS,
					payload: {
						allposts: res.data
					}
				});
			})

		// Clear all the input that might be there.
		this.clearallinput();
	}

	addupdate = async () => {
		/* AddUpdate: 
			if ID present -> Update. 
			If not, then UserID required -> Add. 
			Title & Body -> required 
		*/

		let id = this.InputID.current.value;
		let userId = this.InputUserID.current.value;
		let title = this.InputTitle.current.value;
		let body = this.InputBody.current.value;

		if (id.length !== 0 && title.length !== 0 && body.length !== 0) {
			// console.log('ID present. Updating:');
			// Error when you add (it adds locally id = 101) and then update, the API call throws an error as the server does not have id=101;
			try {
				await axios.get(`${API_URL}/${id}`, {
					method: 'PUT',
					body: JSON.stringify({
						id: id,
						title: title,
						body: body,
						userId: userId,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}).then(response => {
					if (response.status) {
						// console.log(`Put request succeeded. Moving on.`);
						store.dispatch({
							type: actions.UPDATE_POST,
							payload: {
								userId: userId,
								id: id,
								title: title,
								body: body
							}
						});
					}
					else {
						alert(`Something went wrong! Please debug.`);
					}
				})
			} catch (err) {
				alert(`Update Error ${err.response.status}`);
			}
		}
		else if (userId.length !== 0 && title.length !== 0 && body.length !== 0) {
			// console.log('UserID present. Adding:');
			try {

				await axios.get(API_URL, {
					method: 'POST',
					body: JSON.stringify({
						title: title,
						body: body,
						userId: userId,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}).then((response) => {
					if (response.status) {
						// console.log(`Post request succeeded. Moving on.`);

						store.dispatch({
							type: actions.ADD_POST,
							payload: {
								userId: userId,
								title: title,
								body: body
							}
						});
					}
					else {
						alert(`Something went wrong! Please debug.`);
					}
				});
			} catch (err) {
				alert(`Add Error ${err.response.status}`);
			}
		}
		else {
			alert("Data not present. Please specify Title, Body and ID or userID.");
		}
		this.clearallinput();
	}

	// DONE
	filter = async () => {
		// Implemented filter by just userID. Filtering by ID or both should be easy with few if statements.
		if (this.InputUserID.current.value.length === 0) {
			alert("UserID required");
		} else {
			try {
				await axios.get(`${API_URL}?userId=${this.InputUserID.current.value}`)
					.then(res => {
						console.log(`Filtering all posts from the userID: ${this.InputUserID.current.value}`);
						// Checking server response.
						if (res.status) {
							// console.log(`Get request succeeded. Moving on.`);
							store.dispatch({
								type: actions.FILTER_POSTS,
								payload: {
									userId: this.InputUserID.current.value
								}
							});
						}
						else {
							alert(`Something went wrong! Please debug.`);
						}
					})
			} catch (err) {
				alert(`Filter Error ${err.response}`);
			}

		}
		this.clearallinput();
	}

	// DONE
	delete = async () => {
		// Error when you add (it adds locally id = 101) and then delete, the API call throws an error as the server does not have id=101;
		if (this.InputID.current.value.length === 0) {
			alert('ID required');
		} else {
			let IdToDelete = parseInt(this.InputID.current.value);
			try {
				await axios.get(`${API_URL}/${this.InputID.current.value}`, {
					method: 'DELETE'
				}).then((res) => {
					// Checking server response.
					if (res.status) {
						// console.log(`Get request succeeded. Moving on.`);
						store.dispatch({
							type: actions.DELETE_POST,
							payload: {
								id: IdToDelete
							}
						});

						// this.setState({
						// 	posts: this.state.posts.filter(eachPost => eachPost.id !== IdToDelete)
						// });
					}
					else {
						alert(`Something went wrong! Please debug.`);
					}
				})
			} catch (err) {
				alert(`Delete Error ${err.response.status}: ID not found`);
			}
		}
		this.clearallinput();
	}

	allPosts = () => {
		store.dispatch({
			type: actions.GET_ALL_POSTS,
		});
	}

	clearallinput = () => {
		this.InputID.current.value = '';
		this.InputUserID.current.value = '';
		this.InputTitle.current.value = '';
		this.InputBody.current.value = '';
	}

	render() {
		return (
			<>
				<Header text='Post Manager!' testTag='header' />

				<CommandStrip>
					<Input type="number" ref={this.InputID} testTag='InputID' placeholder="ID" />
					<Input type="number" ref={this.InputUserID} testTag='InputUserID' placeholder="userID" />
					<Input type="text" ref={this.InputTitle} testTag='InputTitle' placeholder="Title" />
					<Input type="text" ref={this.InputBody} testTag='InputBody' placeholder="Body" />
				</CommandStrip>

				<CommandStrip>
					<Button onClick={this.allPosts} text='All posts' backgroundColor='yellow' testTag='AllBtn' />

					{/* AddUpdate: 
						if ID present -> Update. 
						If not, then UserID required -> Add. 
						Title & Body -> required 
					*/}
					<Button onClick={this.addupdate} text='Add/Update' backgroundColor='#8eba43' testTag='AddUpdateBtn' />

					{/* Filter: Required: userID */}
					<Button onClick={this.filter} text='Filter' backgroundColor='#7d4427' testTag='FilterBtn' />

					{/* Delete: Required: ID */}
					<Button onClick={this.delete} text='Delete' backgroundColor='#cb0000' testTag='DeleteBtn' />
				</CommandStrip>

				<List />
			</>
		)
	}
}

// https://stackoverflow.com/a/38678454
/*
Your component is only going to re-render if its state or props are changed. You are not relying on this.state or this.props, but rather fetching the state of the store directly within your render function.

The connect function generates a wrapper component that subscribes to the store. When an action is dispatched, the wrapper component's callback is notified and hence rerenders.
*/
const mapStateToProps = state => {
	return {
		posts: state.posts,
		filterposts: state.filteredposts
	}
}

export default connect(mapStateToProps)(App);



// Example:
// store.dispatch({
// 	type: 'GET_POSTS',
// 	payload: {
// 		allposts:[
// 			{
// 				userId: 1,
// 				id: 1,
// 				title: 'a',
// 				body: 'body'
// 			},
// 			{
// 				userId: 2,
// 				id: 2,
// 				title: 'b',
// 				body: 'c'
// 			},
// 			{
// 				userId: 1,
// 				id: 3,
// 				title: 'd',
// 				body: 'e'
// 			}
// 		]
// 	}
// });