import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';
import TotalLikes from './TotalLikes';
import CreateLikes from './CreateLikes';
import { SinglePostStyles } from './styles/SinglePostStyles';
const SINGLE_POST_QUERY = gql`
	query SINGLE_POST_QUERY($id: ID!) {
		post(where: { id: $id }) {
			id
			title
			description
			largeImage
		}
	}
`;
class SinglePost extends Component {
	render() {
		return (
			<Query query={SINGLE_POST_QUERY} variables={{ id: this.props.id }}>
				{({ error, loading, data }) => {
					if (error) return <Error error={error} />;
					if (loading) return <p>Loading...</p>;
					if (!data.post) return <p>No Post found for {this.props.id}</p>;
					const post = data.post;
					return (
						<SinglePostStyles>
							{/* Observe here we are changing title of the page .
                            nextjs provides us the head where we can add anything and it collects everything and displays  */}
							<Head>
								<title>Scribble | {post.title}</title>
							</Head>
							<img src={post.largeImage} alt={post.title} />
							<div className="details">
								<CreateLikes postId={this.props.id} />
								<h2>{post.title}</h2>
								<p>{post.description}</p>
							</div>
						</SinglePostStyles>
					);
				}}
			</Query>
		);
	}
}
export default SinglePost;
export { SINGLE_POST_QUERY };
