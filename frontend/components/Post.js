import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import PostStyles from './styles/PostStyles';

// import DeletePost from './DeletePost';

export default class Post extends Component {
	static propTypes = {
		post: PropTypes.object.isRequired
	};
	render() {
		const { post } = this.props;
		return (
			<PostStyles>
				{post.image && <img src={post.image} alt={post.title} />}
				<Title>
					<Link
						href={{
							pathname: '/post',
							query: { id: post.id }
						}}
					>
						<a>{post.title}</a>
					</Link>
				</Title>

				<p>{post.description}</p>

				<div className="buttonList">
					<Link
						href={{
							pathname: 'update',
							query: { id: post.id }
						}}
					>
						<a>Edit ✏️</a>
					</Link>
					<AddToCart id={post.id} />
					{/* <DeletePost id={post.id}>Delete This post</DeletePost> */}
				</div>
			</PostStyles>
		);
	}
}
