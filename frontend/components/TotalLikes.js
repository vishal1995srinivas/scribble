import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const TotalLikes = (props) => (
	<div>
		{count} like{count > 1 && 's'}
	</div>
);
export default TotalLikes;
export { TOTAL_LIKES_QUERY };
