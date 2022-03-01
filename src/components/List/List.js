import styled from 'styled-components';
import store from '../../redux/store'


const Table = styled.table`
	border: 1px solid black;
	border-collapse: collapse;
`;

const List = () => {

	let allposts = store.getState().posts;
	let filterposts = store.getState().filteredposts;

	// Maybe this is not needed as we are using connect in app.js
	// const unsubscribe = store.subscribe(() => {
	// 	let allposts = store.getState().posts;
	// 	let filterposts = store.getState().filteredposts;
		
	// 	// console.log(`Store update. New state: `);
	// 	// console.log(store.getState());
	// });

	// call unsubscribe to stop watching the changes to the store.
	// unsubscribe();
	// After this the data/ state and store will not be updates. 
	// This is used to reduce memory leaks when having more than 1 store.

	return (
		<Table>
			<tbody>
				<tr>
					<th>ID</th>
					<th>UserID</th>
					<th>Title</th>
					<th>Body</th>
				</tr>
				{filterposts.length === 0 && allposts.length > 0 &&
					allposts.map((eachPost, index) => (
						<tr key={`${eachPost.id}-${index}`}>
							<td>{eachPost.id}</td>
							<td>{eachPost.userId}</td>
							<td>{eachPost.title}</td>
							<td>{eachPost.body}</td>
						</tr>
					))
				}
				{filterposts.length > 0 &&
					filterposts.map((eachPost, index) => (
						<tr key={`${eachPost.id}-${index}`}>
							<td>{eachPost.id}</td>
							<td>{eachPost.userId}</td>
							<td>{eachPost.title}</td>
							<td>{eachPost.body}</td>
						</tr>
					))
				}

			</tbody>
		</Table>
	);
};


export default (List);