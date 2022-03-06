import React, { useEffect } from 'react';

import styled from 'styled-components';

// Importing all the components
import { Header } from './components/Header/Header';
import { Button } from './components/Button/Button';
import List from './components/List/List';
import * as API from './Api_Call';

// Redux
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
const App = (testprops) => {

	// console.log(a);

	const InputUserID = React.createRef();
	const InputID = React.createRef();
	const InputTitle = React.createRef();
	const InputBody = React.createRef();


	useEffect(() => {
		async function fetchData() {
			await API.API_GET_DEFAULT_LIST({API_URL});
		}
		fetchData();
	}, []);

	const addupdate = async () => {
		/* AddUpdate: 
			if ID present -> Update. 
			If not, then UserID required -> Add. 
			Title & Body -> required 
		*/

		let props = {
			API_URL,
			id: parseInt(InputID.current.value) || testprops.testId || 0,
			userId: parseInt(InputUserID.current.value) || testprops.testuserId || 0,
			title: InputTitle.current.value || testprops.testTitle || '',
			body: InputBody.current.value || testprops.testBody || ''
		}

		clearallinput();

		let api_response = await API.API_ADD_UPDATE_LIST(props);

		if(!api_response){
			alert('Data not present. All info is needed.');
		}
	}

	const filter = async () => {
		let userId = parseInt(InputUserID.current.value) || testprops.testuserId || 0;
		clearallinput();

		if (userId === 0) {
			alert("UserID required");
		} else {
			await API.API_FILTER_LIST({API_URL, userId});
		}
	}

	const deletePost = async () => {
		let id = parseInt(InputID.current.value) || testprops.testId || 0;
		clearallinput();
		// Error when you add (it adds locally id = 101) and then delete, the API call throws an error as the server does not have id=101;

		if (id === 0) {
			alert('ID required');
		} else {
			await API.API_DELETE_LIST({API_URL, id});
		}
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
				<Button onClick={() => API.API_GET_CURRENT_LIST()} text='All posts' backgroundColor='yellow' testTag='AllBtn' />

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