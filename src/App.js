import React, { useEffect } from 'react';
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

// use functional components. UseEffect instead of constructor and componentDidMount
const App = () => {
	const InputUserID = React.createRef();
	const InputID = React.createRef() || 5;
	const InputTitle = React.createRef();
	const InputBody = React.createRef();


	useEffect(() => {

		async function fetchData() {
			await axios.get(API_URL)
				.then(res => {
					store.dispatch({
						type: actions.GET_POSTS,
						payload: {
							allposts: res.data
						}
					});
				})
		}
		fetchData();
	}, []);

	const addupdate = async () => {
		/* AddUpdate: 
			if ID present -> Update. 
			If not, then UserID required -> Add. 
			Title & Body -> required 
		*/

		let id = parseInt(InputID.current.value);
		let userId = parseInt(InputUserID.current.value);
		let title = InputTitle.current.value;
		let body = InputBody.current.value;

		clearallinput();

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
	}

	// DONE
	const filter = async () => {
		let UserIdToFilter = parseInt(InputUserID.current.value);
		clearallinput();
		// Implemented filter by just userID. Filtering by ID or both should be easy with few if statements.
		if (UserIdToFilter === 0) {
			alert("UserID required");
		} else {
			try {
				await axios.get(`${API_URL}?userId=${UserIdToFilter}`)
					.then(res => {
						console.log(`Filtering all posts from the userID: ${UserIdToFilter}`);
						// Checking server response.
						if (res.status) {
							// console.log(`Get request succeeded. Moving on.`);
							store.dispatch({
								type: actions.FILTER_POSTS,
								payload: {
									userId: UserIdToFilter
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
	}

	// DONE
	const deletePost = async () => {
		// Error when you add (it adds locally id = 101) and then delete, the API call throws an error as the server does not have id=101;
		if (InputID.current.value.length === 0) {
			alert('ID required');
		} else {
			let IdToDelete = parseInt(InputID.current.value);
			clearallinput();
			try {
				await axios.get(`${API_URL}/${IdToDelete}`, {
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
					}
					else {
						alert(`Something went wrong! Please debug.`);
					}
				})
			} catch (err) {
				alert(`Delete Error ${err.response.status}: ID not found`);
			}
		}
	}

	const allPosts = () => {
		store.dispatch({
			type: actions.GET_ALL_POSTS,
		});
	}

	const clearallinput = () => {

		if (InputID.current != null) {
			InputID.current.value = null;
		}
		if (InputUserID.current != null) {
			InputUserID.current.value = null;
		}
		if (InputTitle.current != null) {
			InputTitle.current.value = '';
		}
		if (InputBody.current != null) {
			InputBody.current.value = '';
		}
	}

	return (
		<>
			<Header text='Post Manager!' testTag='header' />

			<CommandStrip>
				<Input type="number" ref={InputID} testTag='InputID' placeholder="ID" />
				<Input type="number" ref={InputUserID} testTag='InputUserID' placeholder="userID" />
				<Input type="text" ref={InputTitle} testTag='InputTitle' placeholder="Title" />
				<Input type="text" ref={InputBody} testTag='InputBody' placeholder="Body" />
			</CommandStrip>

			<CommandStrip>
				<Button onClick={allPosts} text='All posts' backgroundColor='yellow' testTag='AllBtn' />

				{/* AddUpdate: 
					if ID present -> Update. 
					If not, then UserID required -> Add. 
					Title & Body -> required 
				*/}
				<Button onClick={addupdate} text='Add/Update' backgroundColor='#8eba43' testTag='AddUpdateBtn' />

				{/* Filter: Required: userID */}
				<Button onClick={filter} text='Filter' backgroundColor='#7d4427' testTag='FilterBtn' />

				{/* Delete: Required: ID */}
				<Button onClick={deletePost} text='Delete' backgroundColor='#cb0000' testTag='DeleteBtn' />
			</CommandStrip>

			<List />
		</>
	)

}

// https://stackoverflow.com/a/38678454
// https://stackoverflow.com/a/38205160
/*
Your component is only going to re-render if its state or props are changed. You are not relying on this.state or this.props, but rather fetching the state of the store directly within your render function.

The connect function generates a wrapper component that subscribes to the store. When an action is dispatched, the wrapper component's callback is notified and hence rerenders.
*/

// We can also use subscribe to checkout the change in store. But we are using connect so no need.

export default connect()(App);