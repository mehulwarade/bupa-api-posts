import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Importing all the components
import { Header } from './components/Header/Header'
import { Button } from './components/Button/Button'

const CommandStrip = styled.section`
  background: #f1f1f2;
  text-align: center;
`;

const Table = styled.table`
	border: 1px solid black;
	border-collapse: collapse;
`;


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			posts: []
		}
		this.add = this.add.bind(this);
	}

	componentDidMount = async () => {
		// Initial load of data from the server
		await axios.get('https://jsonplaceholder.typicode.com/posts')
			.then(res => {
				this.setState(() => ({
					posts: res.data,
				}));
			})
	}

	add = async () => {
		await axios.get('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({
				title: 'foo',
				body: 'bar',
				userId: 1,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => console.log(response.status))
	}

	update = async () => {
		await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
			method: 'PUT',
			body: JSON.stringify({
				id: 1,
				title: 'foo',
				body: 'bar',
				userId: 1,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then(res => {
				console.log(res.data);
				this.setState(() => ({
					posts: res.data,
				}));
			})
			.catch(err => {
				console.log(err);
			})
	}

	filter = async () => {
		await axios.get('https://jsonplaceholder.typicode.com/posts?userId=2')
			.then(res => {
				console.log(res.data);
				this.setState(() => ({
					posts: res.data,
				}));
			})
	}

	delete = async () => {
		await axios.get('https://jsonplaceholder.typicode.com/posts/1', {
			method: 'DELETE',
		})
			.then((response) => console.log(response.status))
	}

	render() {
		return (
			<>
				<Header text='Post Manager!' testTag='header' />

				<CommandStrip>
					<Button onClick={this.add} text='Add' backgroundColor='#8eba43' testTag='AddBtn' />
					<Button onClick={this.update} text='Update' backgroundColor='#0757' testTag='UpdateBtn' />
					<Button onClick={this.filter} text='Filter' backgroundColor='#7d4427' testTag='FilterBtn' />
					<Button onClick={this.delete} text='Delete' backgroundColor='#cb0000' testTag='DeleteBtn' />
				</CommandStrip>

				{console.log(this.state.posts)}

				{this.state.posts.length > 0 &&
					<div>
						{this.state.posts.map((post, index) => {
							//console.log(post.body);
							<div>{post.body}</div>
						})
						}
					</div>
				}
				<Table>
					<tbody>
						<tr>
							<th>userID</th>
							<th>ID</th>
							<th>Title</th>
							<th>Body</th>
						</tr>
						{
							this.state.posts.map((eachPost, index) => (
								<tr key={`${eachPost.task}-${index}`}>
									<td>{eachPost.userId}</td>
									<td>{eachPost.id}</td>
									<td>{eachPost.title}</td>
									<td>{eachPost.body}</td>
								</tr>
							))
						}
					</tbody>
				</Table>
			</>
		)
	}
}

export default (App);