import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';
// import TotalLikes from './TotalLikes';
// import CreateLikes from './CreateLikes';
const SinglePostStyles = styled.div`
	max-width: 1200px;
	margin: 2rem auto;
	box-shadow: ${(props) => props.theme.bs};
	display: grid;
	grid-auto-rows: 1fr;
	grid-auto-flow: rows;
	min-height: 800px;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover; /*  try this with cover and contain */
	}
	.details {
		margin: 3rem;
		font-size: 2rem;
	}
`;

class SinglePost extends Component {
	render() {
		return (
			<SinglePostStyles>
				{/* Observe here we are changing title of the page .
                            nextjs provides us the head where we can add anything and it collects everything and displays  */}
				<Head>
					<title>Scribble | {post.title}</title>
				</Head>
				<img src={post.largeImage} alt={post.title} />
				<div className="details">
					<h2>{post.title}</h2>
					<p>Description {post.description}</p>
					<p>Likes</p>
					{/* <TotalLikes />
								<CreateLikes postId={this.props.id} /> */}
				</div>
			</SinglePostStyles>
		);
	}
}
export default SinglePost;
export { SINGLE_POST_QUERY };
