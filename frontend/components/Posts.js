import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Post from './Post';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_POSTS_QUERY = gql`
	query ALL_POSTS_QUERY($skip: Int=0, $first: Int= ${perPage}) {
		posts(first: $first, skip: $skip, orderBy:createdAt_DESC) {
			id
			title
			price
			description
			image
			largeImage
		}
	}
`;
const Center = styled.div`text-align: center;`;
const PostsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
	max-width: ${(props) => props.theme.maxWidth};
	margin: 0 auto;
`;
class Posts extends Component {
	render() {
		return (
			<Center>
				<Pagination page={this.props.page} />
				<Query
					query={ALL_POSTS_QUERY}
					variables={{ skip: this.props.page * perPage - perPage, first: perPage }}
				>
					{({ data, error, loading }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error: {error.message}</p>;
						console.log(data);
						return <PostsList>{data.posts.map((post) => <Post post={post} key={post.id} />)}</PostsList>;
					}}
				</Query>
				<Pagination page={this.props.page} />
			</Center>
		);
	}
}
export default Posts;
export { ALL_POSTS_QUERY };
