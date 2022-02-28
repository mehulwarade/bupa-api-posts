import styled from 'styled-components';

const Table = styled.table`
	border: 1px solid black;
	border-collapse: collapse;
`;

export const List = (props) => {

	return (
		<Table>
			<tbody>
				<tr>
					<th>ID</th>
					<th>UserID</th>
					<th>Title</th>
					<th>Body</th>
				</tr>
				{props.filterposts.length === 0 && props.allposts.length > 0 && 
					props.allposts.map((eachPost, index) => (
						<tr key={`${eachPost.id}-${index}`}>
							<td>{eachPost.id}</td>
							<td>{eachPost.userId}</td>
							<td>{eachPost.title}</td>
							<td>{eachPost.body}</td>
						</tr>
					))
				}
				{props.filterposts.length > 0 &&
					props.filterposts.map((eachPost, index) => (
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
