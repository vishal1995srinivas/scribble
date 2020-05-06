import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const TOTAL_LIKES_QUERY = gql`
	query TOTAL_LIKES_QUERY {
		likesesConnection {
			aggregate {
				count
			}
		}
	}
`;
const TotalLikes = (props) => (
	<Query query={TOTAL_LIKES_QUERY}>
		{({ data, loading, error }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error</p>;
			const count = data.likesesConnection.aggregate.count;
			console.log(count);
			return (
				<div>
					{count} like{count > 1 && 's'}
				</div>
			);
		}}
	</Query>
);
export default TotalLikes;
export { TOTAL_LIKES_QUERY };
