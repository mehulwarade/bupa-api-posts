import styled from 'styled-components';

// use hooks for importing. use connect.
import { connect } from 'react-redux';

const Table = styled.table`
	border: 1px solid black;
	border-collapse: collapse;
`;

const List = ({allposts, filterposts}) => {
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

// Used Hooks to get store data.
// https://stackoverflow.com/a/38205160
// https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md
const mapStateToProps = state => {
	return {
		allposts: state.posts,
		filterposts: state.filteredposts
	}
}

export default connect(mapStateToProps)(List);