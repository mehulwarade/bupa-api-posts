import React, { Component } from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';
import styled from 'styled-components';

// Importing all the components
import { Header } from './components/Header/Header'
import { Button } from './components/Button/Button'
import { List } from './components/List/List'

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
		this.state = {
			posts: [],
			filteredposts: []
		}

		this.InputUserID = React.createRef();
		this.InputID = React.createRef();
		this.InputTitle = React.createRef();
		this.InputBody = React.createRef();

		this.addupdate = this.addupdate.bind(this);
		this.filter = this.filter.bind(this);
		this.delete = this.delete.bind(this);
		this.all = this.all.bind(this);
		this.clearallinput = this.clearallinput.bind(this);
	}

	componentDidMount = async () => {
		// Initial load of all data from the server
		this.all();
		await axios.get(API_URL)
			.then(res => {
				this.setState(() => ({
					posts: res.data,
				}));
			})
	}

	addupdate = async () => {
		/* AddUpdate: 
			if ID present -> Update. 
			If not, then UserID required -> Add. 
			Title & Body -> required 
		*/

		let id = this.InputID.current.value;
		let userid = this.InputUserID.current.value;
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
						userId: userid,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}).then(response => {
					if (response.status) {
						// console.log(`Put request succeeded. Moving on.`);
						this.setState({
							posts: this.state.posts.map((eachPost) => {
								if (eachPost.id === id) {
									return {
										userId: userid,
										id: id,
										title: title,
										body: body
									}
								}
								return eachPost;
							})
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
		else if (userid.length !== 0 && title.length !== 0 && body.length !== 0) {
			// console.log('UserID present. Adding:');
			try {

				await axios.get(API_URL, {
					method: 'POST',
					body: JSON.stringify({
						title: title,
						body: body,
						userId: userid,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}).then((response) => {
					if (response.status) {
						// console.log(`Post request succeeded. Moving on.`);

						const previousState = [...this.state.posts];
						this.setState({
							posts: [...previousState, { userId: userid, id: this.state.posts.length + 1, title: title, body: body }]
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
							this.setState({
								filteredposts: this.state.posts.filter(eachPost => eachPost.userId === this.InputUserID.current.value)
							});
						}
						else {
							alert(`Something went wrong! Please debug.`);
						}
					})
			} catch (err) {
				alert(`Filter Error ${err.response.status}`);
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
						this.setState({
							posts: this.state.posts.filter(eachPost => eachPost.id !== IdToDelete)
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
		this.clearallinput();
	}

	// Showing all posts.
	all = () => {
		this.setState({
			filteredposts: []
		});
		this.clearallinput();
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
					<Button onClick={this.all} text='All posts' backgroundColor='yellow' testTag='AllBtn' />

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

				<List allposts={this.state.posts} filterposts={this.state.filteredposts} />

			</>
		)
	}
}

export default (App);