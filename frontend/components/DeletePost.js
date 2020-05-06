import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_POSTS_QUERY } from './Posts';

const DELETE_POST_MUTATION = gql`
	mutation DELETE_POST_MUTATION($id: ID!) {
		deletePost(id: $id) {
			id
		}
	}
`;
class DeletePost extends Component {
	update = (cache, payload) => {
		// manually update the cache on the client, so it matches the server
		// 1. Read the cache for the items we want
		const data = cache.readQuery({ query: ALL_POSTS_QUERY });
		console.log(data, payload);
		// 2. Filter the deleted item out of the page
		data.posts = data.posts.filter((post) => post.id !== payload.data.deletePost.id);
		// 3. Put the items back!
		cache.writeQuery({ query: ALL_POSTS_QUERY, data });
	};
	render() {
		return (
			<Mutation mutation={DELETE_POST_MUTATION} variables={{ id: this.props.id }} update={this.update}>
				{(deletePost, { error }) => (
					<button
						onClick={() => {
							if (confirm('Are you sure you want to delete this item?')) {
								deletePost().catch((err) => {
									alert(err.message);
								});
							}
						}}
					>
						{this.props.children}
					</button>
				)}
			</Mutation>
		);
	}
}

export default DeletePost;
