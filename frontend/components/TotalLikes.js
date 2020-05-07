import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const TOTAL_LIKES_QUERY = gql`
	query TOTAL_LIKES_QUERY($post: ID!) {
		likesesConnection(where: { post: { id: $post } }) {
			aggregate {
				count
			}
		}
	}
`;
const TotalLikes = ({ postId }) => (
	<Query query={TOTAL_LIKES_QUERY} variables={{ post: postId }}>
		{({ data, loading, error }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error</p>;
			const count = data.likesesConnection.aggregate.count;
			console.log(count);
			return (
				<div align="left">
					{
						<h2>
							{count} lik{count == 1 ? 'e' : 'es'}
						</h2>
					}
				</div>
			);
		}}
	</Query>
);
export default TotalLikes;
export { TOTAL_LIKES_QUERY };
