import styled from 'styled-components';
import store from '../../redux/store'
// use hooks for importing. use connect.

const Table = styled.table`
	border: 1px solid black;
	border-collapse: collapse;
`;

const List = () => {

	let allposts = store.getState().posts;
	let filterposts = store.getState().filteredposts;

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